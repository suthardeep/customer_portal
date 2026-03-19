interface CampaignRulesProps {
  rules: string[] | null;
}

function CampaignRules({ rules }: CampaignRulesProps) {
  const hasRules = rules && rules.length > 0;
  if (!hasRules) return null;

  return (
    <div className="space-y-2">
      <h6 className="font-bold text-n-900">Rules</h6>
      <ul className="list-disc list-inside space-y-1">
        {rules.map((rule, i) => (
          <li key={i} className="text-n-800">
            {rule}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CampaignRules;
