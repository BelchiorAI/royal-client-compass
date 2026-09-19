import { useState, type ReactNode } from "react";
import { CloudUpload, FileText, PenLine, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { documents } from "@/api/mock";
import { btn } from "@/components/shared/primitives";
import { cn } from "@/lib/utils";

export type DocModal = "upload" | "request" | "sign" | null;

const CATEGORIES = ["Identity", "Address", "Legal", "Policy", "Financial", "Claims", "Investments"];

function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12.5px] font-medium text-foreground">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[11.5px] text-muted-foreground">{hint}</span>}
    </label>
  );
}

function ModalFrame({
  open,
  onClose,
  icon,
  title,
  description,
  children,
  onSubmit,
  submitLabel,
}: {
  open: boolean;
  onClose: () => void;
  icon: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
  onSubmit: () => void;
  submitLabel: string;
}) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg p-0 gap-0 overflow-hidden">
        <DialogHeader className="border-b px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary-wash text-primary">{icon}</span>
            <div>
              <DialogTitle className="text-[15px]">{title}</DialogTitle>
              <DialogDescription className="text-[12.5px]">{description}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form
          className="space-y-4 px-6 py-5"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          {children}
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className={btn.secondary} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={btn.primary}>
              {submitLabel}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function UploadDocumentModal({ open, onClose, clientName }: { open: boolean; onClose: () => void; clientName: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Identity");
  const [drag, setDrag] = useState(false);

  return (
    <ModalFrame
      open={open}
      onClose={onClose}
      icon={<CloudUpload className="size-4" />}
      title="Upload Document"
      description={`Add a document to ${clientName}'s file.`}
      submitLabel="Upload"
      onSubmit={() => {
        if (!title.trim()) return toast.error("Please give the document a title");
        toast.success("Document uploaded", { description: `${title} · ${category}${file ? ` · ${file.name}` : ""}` });
        setTitle("");
        setFile(null);
        onClose();
      }}
    >
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          const f = e.dataTransfer.files?.[0];
          if (f) setFile(f);
        }}
        className={cn(
          "flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-8 text-center transition-colors",
          drag ? "border-primary bg-primary-wash" : "border-border bg-background",
        )}
      >
        <CloudUpload className="size-7 text-primary" strokeWidth={1.5} />
        <p className="mt-2 text-[13px] font-medium">{file ? file.name : "Drag & drop your file here"}</p>
        <p className="text-[11.5px] text-muted-foreground">PDF, JPG or PNG up to 20 MB</p>
        <label className={cn(btn.secondary, "mt-3 h-8 cursor-pointer text-[12.5px]")}>
          Browse files
          <input type="file" className="sr-only" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        </label>
      </div>
      <Field label="Document title">
        <input className={btn.input} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Proof of Residential Address" />
      </Field>
      <Field label="Category">
        <select className={btn.input} value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </Field>
    </ModalFrame>
  );
}

export function RequestDocumentModal({ open, onClose, clientName }: { open: boolean; onClose: () => void; clientName: string }) {
  const [doc, setDoc] = useState("");
  const [note, setNote] = useState("");
  const [due, setDue] = useState("");
  return (
    <ModalFrame
      open={open}
      onClose={onClose}
      icon={<FileText className="size-4" />}
      title="Request Document"
      description={`Send ${clientName} a secure upload request.`}
      submitLabel="Send request"
      onSubmit={() => {
        if (!doc.trim()) return toast.error("Tell the client which document you need");
        toast.success("Request sent", { description: `${doc}${due ? ` · due ${due}` : ""}` });
        setDoc("");
        setNote("");
        setDue("");
        onClose();
      }}
    >
      <Field label="Required document">
        <input className={btn.input} value={doc} onChange={(e) => setDoc(e.target.value)} placeholder="e.g. Latest bank statement (3 months)" />
      </Field>
      <Field label="Note to client">
        <textarea
          className={cn(btn.input, "h-24 resize-none py-2")}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add context or instructions…"
        />
      </Field>
      <Field label="Due date">
        <input type="date" className={btn.input} value={due} onChange={(e) => setDue(e.target.value)} />
      </Field>
    </ModalFrame>
  );
}

export function SendForSignatureModal({
  open,
  onClose,
  defaultDocId,
  defaultEmail,
}: {
  open: boolean;
  onClose: () => void;
  defaultDocId?: string;
  defaultEmail?: string;
}) {
  const [docId, setDocId] = useState(defaultDocId ?? documents[0]!.id);
  const [email, setEmail] = useState(defaultEmail ?? "");
  const [aes, setAes] = useState(true);
  return (
    <ModalFrame
      open={open}
      onClose={onClose}
      icon={<PenLine className="size-4" />}
      title="Send for Signature"
      description="Route a document for secure electronic signature."
      submitLabel="Send for signature"
      onSubmit={() => {
        if (!email.includes("@")) return toast.error("Enter a valid signer email");
        const d = documents.find((x) => x.id === docId);
        toast.success("Sent for signature", { description: `${d?.name} → ${email}${aes ? " · AES" : ""}` });
        onClose();
      }}
    >
      <Field label="Document">
        <select className={btn.input} value={docId} onChange={(e) => setDocId(e.target.value)}>
          {documents.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Signer email">
        <input type="email" className={btn.input} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="client@example.co.za" />
      </Field>
      <div className="flex items-center justify-between rounded-lg border bg-background px-3 py-2.5">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="size-4 text-success" />
          <div>
            <p className="text-[12.5px] font-medium">Advanced Electronic Signature (AES)</p>
            <p className="text-[11px] text-muted-foreground">Identity-verified, ECT Act compliant</p>
          </div>
        </div>
        <Switch checked={aes} onCheckedChange={setAes} aria-label="Toggle AES security" />
      </div>
    </ModalFrame>
  );
}
