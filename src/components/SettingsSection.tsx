interface SettingsSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function SettingsSection({ title, description, children }: SettingsSectionProps) {
  return (
    <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-2 text-white">{title}</h2>
      {description && (
        <p className="text-white/80 mb-4">{description}</p>
      )}
      {children}
    </div>
  );
}