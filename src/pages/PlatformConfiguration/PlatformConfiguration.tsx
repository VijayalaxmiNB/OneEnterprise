import { useState } from 'react'
import type { ReactNode } from 'react'
import {
  Check, ChevronDown, Eye, EyeOff, FileSearch, Globe2, Info,
  LockKeyhole, Network, Save, Send, Settings, ShieldCheck,
  ShieldHalf, ShieldPlus, UploadCloud, X,
} from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'

type ModalType = 'smtp' | 'sms' | 'api' | null

export default function PlatformConfiguration() {
  const [modal, setModal] = useState<ModalType>(null)
  const [modalSaved, setModalSaved] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)
  const [showApiSecret, setShowApiSecret] = useState(false)
  const [showSmsSid, setShowSmsSid] = useState(false)
  const [showSmsToken, setShowSmsToken] = useState(false)
  const [saved, setSaved] = useState(true)

  const [platformName, setPlatformName] = useState('Java Enterprise Suite')
  const [platformUrl, setPlatformUrl] = useState('https://app.javasuite.enterprise')
  const [timezone, setTimezone] = useState('UTC +05:30 (India Standard Time)')
  const [language, setLanguage] = useState('ENGLISH')

  const [smtpHost, setSmtpHost] = useState('smtp.stackly.com')
  const [smtpPort, setSmtpPort] = useState('587')
  const [smtpUsername, setSmtpUsername] = useState('noreply@stackly.com')
  const [smtpPassword, setSmtpPassword] = useState('password123')
  const [encryption, setEncryption] = useState('TLS')
  const [fromEmail, setFromEmail] = useState('noreply@stackly.com')
  const [fromName, setFromName] = useState('Stackly Platform')

  const [smsProvider, setSmsProvider] = useState('Stackly')
  const [smsGatewayName, setSmsGatewayName] = useState('Stackly Primary')
  const [smsApiUrl, setSmsApiUrl] = useState('https://api.stackly.com/2010-04-01')
  const [smsAccountSid, setSmsAccountSid] = useState('ACxxxxxxxxxxxxxxxxxxxxxxxx')
  const [smsSender, setSmsSender] = useState('+14155552671')
  const [smsTimeout, setSmsTimeout] = useState('30')
  const [smsAuthToken, setSmsAuthToken] = useState('xxxxxxxxxxxxxxxxxxxxxxxx')
  const [smsMessagingSid, setSmsMessagingSid] = useState('MGxxxxxxxxxxxxxxxxxxxxxxxx')
  const [smsEnabled, setSmsEnabled] = useState(true)

  const [apiGatewayName, setApiGatewayName] = useState('Main API Gateway')
  const [apiEnvironment, setApiEnvironment] = useState('Production')
  const [apiBaseUrl, setApiBaseUrl] = useState('https://api.stackly.com/V1')
  const [apiVersion, setApiVersion] = useState('V1')
  const [authenticationType, setAuthenticationType] = useState('API Key')
  const [apiKey, setApiKey] = useState('xxxxxxxxxxxxxxxxxxxx')
  const [apiSecret, setApiSecret] = useState('xxxxxxxxxxxxxxxxxxxx')
  const [headerName, setHeaderName] = useState('X-API-Key')
  const [requestTimeout, setRequestTimeout] = useState('30')
  const [retryAttempts, setRetryAttempts] = useState('3')
  const [rateLimit, setRateLimit] = useState('100')
  const [apiEnabled, setApiEnabled] = useState(true)

  const handleSave = () => setSaved(true)
  const handleCancel = () => setSaved(false)

  return (
    <PageContainer className="space-y-4">
      <div>
        <div className="flex items-center gap-2 text-[10px] text-slate-500">
          <span>Administration</span><span>›</span><span>Platform Configuration</span>
        </div>
        <h1 className="mt-1 text-[20px] font-bold text-[#111827]">Platform Configuration</h1>
        <p className="mt-1 text-[10px] text-slate-500">
          Manage core platform identity, regional defaults, and security handling.
        </p>
      </div>

      {saved && <SuccessMessage />}

      <div className="grid gap-4 lg:grid-cols-[1.65fr_0.9fr]">
        <div className="space-y-4">
          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <SectionTitle
              icon={
                <span className="flex h-6 w-6 items-center justify-center rounded-md border-2 border-[#315fd7]">
                  <Settings size={13} />
                </span>
              }
              title="Basic Configuration"
            />
            <div className="space-y-4 border-t border-slate-100 p-4">
              <FormField label="PLATFORM NAME" value={platformName} onChange={setPlatformName} />
              <FormField label="PLATFORM URL" value={platformUrl} onChange={setPlatformUrl} />
            </div>
          </section>

          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <SectionTitle icon={<Globe2 size={18} />} title="Regional Configuration" />
            <div className="grid gap-4 border-t border-slate-100 p-4 sm:grid-cols-2">
              <SelectField
                label="DEFAULT TIME ZONE"
                value={timezone}
                onChange={setTimezone}
                options={[
                  'UTC +05:30 (India Standard Time)',
                  'UTC +00:00 (Coordinated Universal Time)',
                  'UTC -05:00 (Eastern Time)',
                  'UTC +01:00 (Central European Time)',
                ]}
              />
              <SelectField
                label="DEFAULT LANGUAGE"
                value={language}
                onChange={setLanguage}
                options={['ENGLISH', 'HINDI', 'KANNADA', 'FRENCH']}
              />
            </div>
          </section>

          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <SectionTitle icon={<Network size={19} />} title="Communication & Integration" />
            <div className="divide-y divide-slate-100 border-t border-slate-100">
              <IntegrationItem title="SMTP Configuration" description="Manage email server settings" onClick={() => { setModal('smtp'); setModalSaved(false) }} />
              <IntegrationItem title="SMS Gateway" description="Twilio integration settings" onClick={() => { setModal('sms'); setModalSaved(false) }} />
              <IntegrationItem title="API Gateway" description="External system access tokens" onClick={() => { setModal('api'); setModalSaved(false) }} />
            </div>
          </section>

          <div className="flex gap-3 rounded-lg bg-[#e9ebef] px-4 py-3">
            <Info size={18} className="mt-0.5 shrink-0 text-[#2563eb]" />
            <div>
              <p className="text-[11px] font-semibold text-[#334155]">Deployment Note</p>
              <p className="mt-1 text-[10px] leading-5 text-[#64748b]">
                Changes to Core Platform configurations may require a service restart for integrated modules to reflect the updates completely.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-2 bg-[#edf1f6] px-4 py-3">
              <ShieldHalf size={18} className="text-[#315fd7]" />
              <h2 className="text-[15px] font-bold text-[#1e293b]">Security Handling</h2>
            </div>

            <div className="space-y-7 p-5">
              <SecurityItem icon={<ShieldCheck size={17} />} title="Configuration version control" description="All changes are tracked and can be rolled back." />
              <SecurityItem icon={<LockKeyhole size={17} />} title="Encryption of sensitive credentials" description="API keys and passwords are AES-256 encrypted." />
              <SecurityItem icon={<FileSearch size={17} />} title="Audit logs" description="Comprehensive logging of administrative actions." />
            </div>

            <div className="border-t border-slate-200 bg-[#fafafa]">
              <div className="flex items-center gap-3 px-4 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8eef9]">
                  <ShieldPlus size={19} className="text-[#315fd7]" />
                </div>
                <div>
                  <p className="text-[12px] font-medium text-[#334155]">System Health</p>
                  <p className="text-[11px] font-medium text-[#43a261]">Optimal State</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="flex justify-end gap-2 border-t border-slate-200 pt-3">
        <button type="button" onClick={handleCancel} className="h-8 rounded-md border border-slate-200 bg-white px-4 text-[10px] font-semibold text-slate-700">
          Cancel
        </button>
        <button type="button" onClick={handleSave} className="inline-flex h-8 items-center gap-2 rounded-md bg-[#4b43e8] px-4 text-[10px] font-semibold text-white">
          <Save size={12} />
          Save Changes
        </button>
      </div>

      {modal === 'smtp' && (
        <ModalOverlay>
          <div className="w-full max-w-[520px] overflow-hidden rounded-xl bg-white shadow-2xl">
            <ModalHeader
              title="Configure SMTP"
              description="See your SMTP server details to enable outgoing email notifications."
              onClose={() => setModal(null)}
            />

            {modalSaved && (
              <div className="px-4 pb-3">
                <SuccessMessage />
              </div>
            )}

            <div className="space-y-3 px-4 pb-5">
              <FormField label="SMTP Host *" value={smtpHost} onChange={setSmtpHost} />
              <FormField label="Port *" value={smtpPort} onChange={setSmtpPort} />
              <FormField label="User name *" value={smtpUsername} onChange={setSmtpUsername} />
              <PasswordField
                label="Password *"
                value={smtpPassword}
                visible={showPassword}
                onChange={setSmtpPassword}
                onToggle={() => setShowPassword(!showPassword)}
              />
              <SelectField label="Encryption *" value={encryption} onChange={setEncryption} options={['TLS', 'SSL', 'None']} />
              <div className="grid gap-3 sm:grid-cols-2">
                <FormField label="From Email *" value={fromEmail} onChange={setFromEmail} />
                <FormField label="From Name *" value={fromName} onChange={setFromName} />
              </div>
              <TestConnectionButton />
            </div>

            <ModalFooter onCancel={() => setModal(null)} onSave={() => setModalSaved(true)} />
          </div>
        </ModalOverlay>
      )}

      {modal === 'sms' && (
        <ModalOverlay>
          <div className="w-full max-w-[520px] overflow-hidden rounded-xl bg-white shadow-2xl">
            <ModalHeader
              title="SMS Gateway Configuration"
              description="Configure SMS Gateway settings to send SMS from the application."
              onClose={() => setModal(null)}
            />

            {modalSaved && (
              <div className="px-4 pb-3">
                <SuccessMessage />
              </div>
            )}

            <div className="space-y-3 px-4 pb-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <FormField label="Gateway Provider *" value={smsProvider} onChange={setSmsProvider} />
                <FormField label="Gateway Name *" value={smsGatewayName} onChange={setSmsGatewayName} />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <FormField label="API Base URL *" value={smsApiUrl} onChange={setSmsApiUrl} helper="Base URL for Stackly API" />
                <PasswordField
                  label="Account SID *"
                  value={smsAccountSid}
                  visible={showSmsSid}
                  onChange={setSmsAccountSid}
                  onToggle={() => setShowSmsSid(!showSmsSid)}
                  helper="Your Stackly Account SID"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <FormField label="From Number / Sender ID *" value={smsSender} onChange={setSmsSender} helper="Phone number or Sender ID to send SMS from" />
                <FormField label="Connection Timeout (Seconds)" value={smsTimeout} onChange={setSmsTimeout} helper="Timeout for API requests" />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <PasswordField
                  label="Auth Token *"
                  value={smsAuthToken}
                  visible={showSmsToken}
                  onChange={setSmsAuthToken}
                  onToggle={() => setShowSmsToken(!showSmsToken)}
                  helper="Your Stackly Auth Token"
                />
                <FormField label="Messaging Service SID (Optional) *" value={smsMessagingSid} onChange={setSmsMessagingSid} helper="Stackly Messaging Service SID" />
              </div>

              <ToggleField label="Enable Gateway" checked={smsEnabled} onChange={setSmsEnabled} description="Enable this SMS gateway" />

              <ImportantNotes
                items={[
                  'Ensure your Stackly account is active and has sufficient balance.',
                  'Update the from number / Sender ID with a valid and verified number.',
                  'Changes may take a few minutes.',
                ]}
              />
            </div>

            <ModalFooter onCancel={() => setModal(null)} onSave={() => setModalSaved(true)} />
          </div>
        </ModalOverlay>
      )}

      {modal === 'api' && (
        <ModalOverlay>
          <div className="w-full max-w-[600px] overflow-hidden rounded-xl bg-white shadow-2xl">
            <ModalHeader
              title="API Gateway Configuration"
              description="Configure API Gateway settings to connect and communicate with external services."
              onClose={() => setModal(null)}
            />

            {modalSaved && (
              <div className="px-4 pb-3">
                <SuccessMessage />
              </div>
            )}

            <div className="space-y-3 px-4 pb-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <FormField label="Gateway Name *" value={apiGatewayName} onChange={setApiGatewayName} />
                <FormField label="Environment *" value={apiEnvironment} onChange={setApiEnvironment} />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <FormField label="Base URL *" value={apiBaseUrl} onChange={setApiBaseUrl} helper="Base URL of the API Gateway" />
                <FormField label="API Version *" value={apiVersion} onChange={setApiVersion} helper="API version (e.g., v1,v2)" />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <FormField label="Authentication Type *" value={authenticationType} onChange={setAuthenticationType} />
                <PasswordField
                  label="API Key *"
                  value={apiKey}
                  visible={showApiKey}
                  onChange={setApiKey}
                  onToggle={() => setShowApiKey(!showApiKey)}
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <PasswordField
                  label="API Secret *"
                  value={apiSecret}
                  visible={showApiSecret}
                  onChange={setApiSecret}
                  onToggle={() => setShowApiSecret(!showApiSecret)}
                  helper="Secret used to authenticate API requests"
                />
                <FormField label="Header Name (Optional) *" value={headerName} onChange={setHeaderName} helper="Custom header name for API key (if required)" />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <FormField label="Request Timeout (Seconds) *" value={requestTimeout} onChange={setRequestTimeout} helper="Timeout for API requests" />
                <FormField label="Retry Attempts *" value={retryAttempts} onChange={setRetryAttempts} helper="Number of retry attempts on failure" />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <FormField label="Rate Limit (requests/minute) *" value={rateLimit} onChange={setRateLimit} helper="Maximum number of requests allowed per minute" />
                <ToggleField label="Enable Gateway" checked={apiEnabled} onChange={setApiEnabled} description="Enable the API gateway" />
              </div>

              <div className="flex items-center justify-between rounded-lg bg-[#f4f5ff] px-3 py-2.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full">
                    <UploadCloud size={18} className="text-[#4b43e8]" />
                  </div>
                  <span className="text-[11px] font-semibold text-[#334155]">API Gateway Configuration</span>
                </div>
                <TestConnectionButton />
              </div>

              <ImportantNotes
                items={[
                  'Ensure the Base URL is accessible from the application server.',
                  'Use a secure API Key and keep the API Secret confidential.',
                  'Changes may take a few minutes to reflect in the system.',
                ]}
              />
            </div>

            <ModalFooter onCancel={() => setModal(null)} onSave={() => setModalSaved(true)} />
          </div>
        </ModalOverlay>
      )}
    </PageContainer>
  )
}

function SuccessMessage() {
  return (
    <div className="flex min-h-[38px] items-center gap-3 rounded-lg border border-[#dbe8df] bg-white px-3 shadow-sm">
      <div className="h-7 w-[3px] rounded-full bg-[#3b8d57]" />
      <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#3b8d57]">
        <Check size={10} strokeWidth={3} className="text-white" />
      </div>
      <span className="text-[9px] font-medium text-[#3b7d4d]">Your changes has been saved successfully.</span>
    </div>
  )
}

function SectionTitle({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-3">
      <span className="text-[#315fd7]">{icon}</span>
      <h2 className="text-[11px] font-bold text-[#1e293b]">{title}</h2>
    </div>
  )
}

function FormField({
  label, value, onChange, helper,
}: { label: string; value: string; onChange?: (value: string) => void; helper?: string }) {
  return (
    <div>
      <label className="mb-1 block text-[9px] font-semibold text-[#334155]">{label}</label>
      <input
        value={value}
        readOnly={!onChange}
        onChange={(e) => onChange?.(e.target.value)}
        className="h-8 w-full rounded-md border border-slate-200 bg-white px-2.5 text-[10px] text-slate-700 outline-none transition focus:border-[#5876e8]"
      />
      {helper && <p className="mt-1 text-[7px] text-slate-500">{helper}</p>}
    </div>
  )
}

function PasswordField({
  label, value, visible, onChange, onToggle, helper,
}: { label: string; value: string; visible: boolean; onChange: (value: string) => void; onToggle: () => void; helper?: string }) {
  return (
    <div>
      <label className="mb-1 block text-[9px] font-semibold text-[#334155]">{label}</label>
      <div className="relative">
        <input
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 w-full rounded-md border border-slate-200 bg-white px-2.5 pr-8 text-[10px] text-slate-700 outline-none transition focus:border-[#5876e8]"
        />
        <button type="button" onClick={onToggle} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400">
          {visible ? <EyeOff size={13} /> : <Eye size={13} />}
        </button>
      </div>
      {helper && <p className="mt-1 text-[7px] text-slate-500">{helper}</p>}
    </div>
  )
}

function SelectField({
  label, value, onChange, options,
}: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return (
    <div>
      <label className="mb-1 block text-[9px] font-semibold text-[#334155]">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 w-full appearance-none rounded-md border border-slate-200 bg-white px-2.5 pr-8 text-[10px] text-slate-700 outline-none focus:border-[#5876e8]"
        >
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <ChevronDown size={12} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
      </div>
    </div>
  )
}

function IntegrationItem({
  title, description, onClick,
}: { title: string; description: string; onClick: () => void }) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3">
      <div>
        <p className="text-[10px] font-semibold text-[#334155]">{title}</p>
        <p className="mt-0.5 text-[8px] text-slate-500">{description}</p>
      </div>
      <button type="button" onClick={onClick} className="h-7 rounded-md border border-[#5876e8] px-3 text-[9px] font-semibold text-[#4260d7] transition hover:bg-[#eef2ff]">
        Configure
      </button>
    </div>
  )
}

function SecurityItem({
  icon, title, description,
}: { icon: ReactNode; title: string; description: string }) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 shrink-0 text-[#315fd7]">{icon}</span>
      <div>
        <p className="text-[9px] font-semibold text-[#334155]">{title}</p>
        <p className="mt-0.5 text-[8px] leading-4 text-slate-500">{description}</p>
      </div>
    </div>
  )
}

function ModalOverlay({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#111426]/60 p-4">
      {children}
    </div>
  )
}

function ModalHeader({
  title, description, onClose,
}: { title: string; description: string; onClose: () => void }) {
  return (
    <div className="flex items-start justify-between px-4 pb-3 pt-4">
      <div>
        <h2 className="text-[15px] font-bold text-[#111827]">{title}</h2>
        <p className="mt-1 text-[8px] text-slate-500">{description}</p>
      </div>
      <button type="button" onClick={onClose} className="rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600">
        <X size={15} />
      </button>
    </div>
  )
}

function TestConnectionButton() {
  return (
    <button type="button" className="inline-flex h-8 items-center gap-2 rounded-md border border-[#5368f2] px-3 text-[9px] font-semibold text-[#4b5edc] transition hover:bg-[#f1f3ff]">
      <Send size={12} />
      Test Connection
    </button>
  )
}

function ToggleField({
  label, checked, onChange, description,
}: { label: string; checked: boolean; onChange: (value: boolean) => void; description: string }) {
  return (
    <div className="flex items-center gap-3">
      <div>
        <p className="text-[9px] font-semibold text-[#334155]">{label}</p>
        <button
          type="button"
          onClick={() => onChange(!checked)}
          className={`relative mt-1 h-5 w-10 rounded-full transition ${checked ? 'bg-[#4b43e8]' : 'bg-slate-300'}`}
        >
          <span className={`absolute top-[3px] h-3.5 w-3.5 rounded-full bg-white transition ${checked ? 'left-[21px]' : 'left-[3px]'}`} />
        </button>
      </div>
      <span className="mt-4 text-[9px] text-[#334155]">{description}</span>
    </div>
  )
}

function ImportantNotes({ items }: { items: string[] }) {
  return (
    <div className="rounded-lg bg-[#f3f4fa] px-3 py-2.5">
      <div className="mb-2 flex items-center gap-2">
        <Info size={14} className="text-[#4b43e8]" />
        <p className="text-[9px] font-bold text-[#334155]">Important Notes</p>
      </div>
      <ul className="space-y-1 pl-4 text-[7px] leading-3 text-[#475569]">
        {items.map((item) => (
          <li key={item} className="list-disc">{item}</li>
        ))}
      </ul>
    </div>
  )
}

function ModalFooter({ onCancel, onSave }: { onCancel: () => void; onSave: () => void }) {
  return (
    <div className="flex justify-end gap-2 border-t border-slate-100 px-4 py-3">
      <button type="button" onClick={onCancel} className="h-8 rounded-md border border-slate-200 bg-white px-4 text-[9px] font-semibold text-slate-700">
        Cancel
      </button>
      <button type="button" onClick={onSave} className="h-8 rounded-md bg-[#4b43e8] px-4 text-[9px] font-semibold text-white">
        Save Configuration
      </button>
    </div>
  )
}