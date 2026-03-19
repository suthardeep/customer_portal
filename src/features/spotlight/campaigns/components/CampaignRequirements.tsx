interface CampaignRequirementsProps {
  requirements: string[] | null;
}

function CampaignRequirements({ requirements }: CampaignRequirementsProps) {
  if (!requirements || requirements.length === 0) return null;

  return (
    <div className="space-y-2">
      <h6 className="font-bold text-n-900">Requirements</h6>
      <ul className="list-disc list-inside space-y-1">
        {requirements.map((req, i) => (
          <li key={i} className="text-n-800">
            {req}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CampaignRequirements;
