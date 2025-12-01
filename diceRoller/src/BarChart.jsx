import { Bar, BarChart, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function ResultsBarChart({result}) {
if (!result)
  return null;

  const data = [
    {name: "Hits", value: result.avgHits},
    {name: "Lethals", value: result.avgLethalHits},
    {name: "Dev Wounds", value: result.avgDevastatingWounds},
    {name: "Wounds", value: result.avgWounds},
    {name: "Failed Saves", value: result.avgFailedSaves},
    {name: "Damage", value: result.avgTotalDamage},
    {name: "Models Killed", value: result.avgModelsKilled}
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <Bar dataKey="value" fill="#9B5DE5" barSize={30} />
        <XAxis dataKey="name" stroke="#8884d8" />
        <YAxis stroke="purple" />
        <Tooltip />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      </BarChart>
    </ResponsiveContainer>
  );

}