'use client';

import { Handle, Position, NodeProps } from 'reactflow';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Reusable Input Field
function InputField({ label, value, field, handleChange }: { label: string; value?: string; field: string; handleChange: (field: string, value: string) => void }) {
  return (
    <div className="mb-4">
      <label className="text-xs text-zinc-400 mb-1 block">{label}</label>
      <Input
        value={value || ''}
        onChange={(e) => handleChange(field, e.target.value)}
        placeholder={`Enter ${label}`}
        className="bg-zinc-800 text-white border-zinc-600 focus:border-blue-500"
      />
    </div>
  );
}

// Reusable Select Field
function SelectField({ label, value, field, handleChange, options }: { label: string; value?: string; field: string; handleChange: (field: string, value: string) => void; options: string[] }) {
  return (
    <div className="mb-4">
      <label className="text-xs text-zinc-400 mb-1 block">{label}</label>
      <Select
        value={value || ''}
        onValueChange={(val) => handleChange(field, val)}
      >
        <SelectTrigger className="bg-zinc-800 border-zinc-600 text-white">
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent className="bg-zinc-900 text-white border-zinc-700">
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default function ToolNode({ data, selected, id }: NodeProps) {
  const handleChange = (field: string, value: string) => {
    data.onChange(id, { ...data, [field]: value });
  };

  const renderFields = () => {
    switch (data.toolType) {
      case 's3':
        return (
          <>
            <InputField label="Bucket Name" value={data.bucketName} field="bucketName" handleChange={handleChange} />
            <SelectField label="Operation" value={data.operation} field="operation" handleChange={handleChange} options={['listObjects', 'getObject', 'putObject', 'deleteObject']} />
            {(data.operation === 'getObject' || data.operation === 'putObject' || data.operation === 'deleteObject') && (
              <InputField label="Object Key" value={data.objectKey} field="objectKey" handleChange={handleChange} />
            )}
          </>
        );
      case 'rest':
        return (
          <>
            <InputField label="Endpoint URL" value={data.endpointUrl} field="endpointUrl" handleChange={handleChange} />
            <SelectField label="HTTP Method" value={data.method} field="method" handleChange={handleChange} options={['GET', 'POST', 'PUT', 'DELETE']} />
          </>
        );
      case 'soap':
        return (
          <>
            <InputField label="WSDL URL" value={data.wsdlUrl} field="wsdlUrl" handleChange={handleChange} />
            <InputField label="Operation Name" value={data.soapOperation} field="soapOperation" handleChange={handleChange} />
          </>
        );
      case 'file':
        return <InputField label="File Path" value={data.filePath} field="filePath" handleChange={handleChange} />;
      case 'email':
        return (
          <>
            <InputField label="SMTP Host" value={data.smtpHost} field="smtpHost" handleChange={handleChange} />
            <InputField label="Username" value={data.smtpUser} field="smtpUser" handleChange={handleChange} />
            <InputField label="Password" value={data.smtpPass} field="smtpPass" handleChange={handleChange} />
            <InputField label="To Address" value={data.toAddress} field="toAddress" handleChange={handleChange} />
          </>
        );
      case 'slack':
        return <InputField label="Slack Webhook URL" value={data.webhookUrl} field="webhookUrl" handleChange={handleChange} />;
      case 'sql':
        return (
          <>
            <InputField label="DB Connection URL" value={data.dbUrl} field="dbUrl" handleChange={handleChange} />
            <InputField label="SQL Query" value={data.sqlQuery} field="sqlQuery" handleChange={handleChange} />
          </>
        );
      case 'nosql':
        return (
          <>
            <InputField label="MongoDB URI" value={data.mongoUri} field="mongoUri" handleChange={handleChange} />
            <InputField label="Collection Name" value={data.collectionName} field="collectionName" handleChange={handleChange} />
          </>
        );
      case 'oauth2':
        return (
          <>
            <InputField label="Token URL" value={data.tokenUrl} field="tokenUrl" handleChange={handleChange} />
            <InputField label="Client ID" value={data.clientId} field="clientId" handleChange={handleChange} />
            <InputField label="Client Secret" value={data.clientSecret} field="clientSecret" handleChange={handleChange} />
          </>
        );
      case 'delay':
        return <InputField label="Delay in Seconds" value={data.delaySeconds} field="delaySeconds" handleChange={handleChange} />;
      default:
        return <div className="text-sm text-zinc-400">Select a Tool Type...</div>;
    }
  };

  return (
    <motion.div
      className={`w-80 rounded-xl border p-4 shadow-md transition
        ${selected ? 'border-blue-500 shadow-blue-500/20' : 'border-zinc-700'}
        bg-zinc-900 relative`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      {/* Input Handle (Incoming Connections) */}
      <Handle
        type="target"
        position={Position.Top}
        id="input"
        style={{ background: '#10B981', width: 12, height: 12, borderRadius: '50%' }}
      />

      {/* Title */}
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5 text-blue-400" />
        <h3 className="text-white font-semibold text-sm tracking-wide">Tool Node</h3>
      </div>

      {/* Tool Type Selector */}
      <div className="mb-4">
        <label className="text-xs text-zinc-400 mb-1 block">Tool Type</label>
        <Select
          value={data.toolType || ''}
          onValueChange={(val) => handleChange('toolType', val)}
        >
          <SelectTrigger className="bg-zinc-800 border-zinc-600 text-white">
            <SelectValue placeholder="Select Tool Type" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 text-white border-zinc-700">
            <SelectItem value="s3">S3 Reader</SelectItem>
            <SelectItem value="rest">REST API Caller</SelectItem>
            <SelectItem value="soap">SOAP API Caller</SelectItem>
            <SelectItem value="file">File Reader</SelectItem>
            <SelectItem value="email">Email Sender</SelectItem>
            <SelectItem value="slack">Slack Notifier</SelectItem>
            <SelectItem value="sql">SQL Query Runner</SelectItem>
            <SelectItem value="nosql">NoSQL Fetcher</SelectItem>
            <SelectItem value="oauth2">OAuth2 Token Fetcher</SelectItem>
            <SelectItem value="delay">Delay Node</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Dynamic Config Fields */}
      {renderFields()}

      {/* Output Handle (Outgoing Connections) */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="output"
        style={{ background: '#3B82F6', width: 12, height: 12, borderRadius: '50%' }}
      />
    </motion.div>
  );
}
