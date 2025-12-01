//RollDice.js 
import { useState } from "react";
import { simulateManySequence } from "./diceLogic.jsx";
import './RollDice.css'
import ResultsBarChart from "./BarChart.jsx";

function RollDice() {

const [attacks, setAttacks] = useState(10);
const [bsWs, setSkill] = useState(3);
const [strength, setStrength] = useState(4);
const [toughness, setToughness] = useState(4);
const [save, setSave] = useState(3);
const [invuln, setInvuln] = useState(4);
const [fnp, setFnp] = useState(0);
const [ap, setAp] = useState(0);
const [damage, setDamage] = useState("1");
const [wounds, setWounds] = useState(4);
const [sustainedHits, setSustainedHits] = useState(0);
const [lethalHits, setLethalHits] = useState(false);
const [criticalHit, setCriticalHit] = useState(6);
const [criticalWound, setCriticalWound] = useState(6);
const [rerollHits, setRerollHits] = useState("");
const [rerollWounds, setRerollWounds] = useState("");
const [devastatingWounds, setDevastatingWounds] = useState(false);
const [N, setN] = useState(100);

const [result, setResult] = useState(null);

function handleRoll() {
    const profile = {
    attacks: Number(attacks),
    bsWs: Number(bsWs),
    strength: Number(strength),
    toughness: Number(toughness),
    save: Number(save),
    invuln: Number(invuln),
    fnp: Number(fnp),
    ap: Number(ap),
    wounds: Number(wounds),
    sustainedHits: Number(sustainedHits),
    criticalHit: Number(criticalHit),
    criticalWound: Number(criticalWound),
    N: Math.max(1, Number(N)), // clamp so it can’t be 0
    damage, // leave damage as string spec
    rerollHits,
    rerollWounds,
    lethalHits,
    devastatingWounds,
  };
    const r = simulateManySequence(profile);
    setResult(r);
}
//attacks, bsWs, strength, toughness, save, invuln, fnp, ap, damage, wounds, sustainedHits, lethalHits, criticalHit, criticalWound, rerollHits, rerollWounds, devastatingWounds, N

return (
    <div  className="RollDice">
        <h2>Offensive Stats</h2>
        <div className="RollDiceRow">
            <div className="RollDiceField">
                <label>Attacks:</label>
                <input
                    type="number"
                    value={attacks}
                    onChange={(e) => setAttacks(e.target.value)}
                /> 
            </div>

            <div className="RollDiceField">
                <label>BS/WS:</label>
                <input
                    type="number"
                    value={bsWs}
                    onChange={(e) => setSkill(e.target.value)}
                /> 
            </div>

            <div className="RollDiceField">
                <label>Strength:</label>
                <input
                    type="number"
                    value={strength}
                    onChange={(e) => setStrength(e.target.value)}
                /> 
            </div>

            <div className="RollDiceField">
                <label>AP:</label>
                <input
                    type="number"
                    value={ap}
                    onChange={(e) => setAp(e.target.value)}
                /> 
            </div>

            <div className="RollDiceField">
                <label>Damage: </label>
                <input
                    type="text"
                    value={damage}
                    onChange={(e) => setDamage(e.target.value)}
                    placeholder = "1, D6+2, d3, etc"
                />
            </div>

            <div className="RollDiceField">
                <label>Sustained Hits:</label>
                <input
                    type="number"
                    value={sustainedHits}
                    onChange={(e) => setSustainedHits(e.target.value)}
                />
            </div>
        </div>

        <div className="RollDiceRow">
            <div className="RollDiceField">
                <label>Lethal Hits:</label>
                <input
                    type="checkbox"
                    checked={lethalHits}
                    onChange={(e) => setLethalHits(e.target.checked)} 
                />
            </div>

            <div className="RollDiceField">
                <label>Critical Hit:</label>
                <input
                    type="number"
                    check={criticalHit}
                    onChange={(e) => setCriticalHit(e.target.value)}
                />
            </div>

            <div className="RollDiceField">
                <label>rerollHits:</label>
                <select value={rerollHits} onChange={(e) => setRerollHits(e.target.value)}>
                    <option value="">No hit rolls</option>
                    <option value="rollOne">Hit rolls of 1</option>
                    <option value="failedHitRolls">Reroll failed hit rolls</option>
                    <option value="nonHitCritRoll">Reroll non critical rolls</option>
                </select>
            </div>
        
            <div className="RollDiceField">
                <label>Critical Wound:</label>
                <input
                    type="number"
                    check={criticalWound}
                    onChange={(e) => setCriticalWound(e.target.value)}
                />
            </div>

            <div className="RollDiceField">
                <label>Devastating Wounds:</label>
                <input
                    type="checkbox"
                    checked={devastatingWounds}
                    onChange={(e) => setDevastatingWounds(e.target.checked)}
                />
            </div>

            <div className="RollDiceField">
                <label>Reroll Wounds:</label>
                <select value={rerollWounds} onChange={(e) => setRerollWounds(e.target.value)}>
                    <option value="">No wound rolls</option>
                    <option value="rollOne">Wound rolls of 1</option>
                    <option value="failedWoundRolls">Reroll failed wound rolls</option>
                    <option value="nonWoundCritRoll">Reroll non critical rolls</option>
                </select>
            </div>
        </div>
        <h2>Defensive Stats</h2>
        <div className="RollDiceRow">
            <div className="RollDiceField">
                <label>Toughness:</label>
                <input
                    type="number"
                    value={toughness}
                    onChange={(e) => setToughness(e.target.value)}
                />
            </div>

            <div className="RollDiceField">
                <label>Save:</label>
                <input
                    type="number"
                    value={save}
                    onChange={(e) => setSave(e.target.value)}
                /> 
            </div>

            <div className="RollDiceField">
                <label>Invunerable Save:</label>
                <input
                    type="number"
                    value={invuln}
                    onChange={(e) => setInvuln(e.target.value)}
                /> 
            </div>

            <div className="RollDiceField">
                <label>Feel no pain:</label>
                <input
                    type="number"
                    value={fnp}
                    onChange={(e) => setFnp(e.target.value)}
                />
            </div>

            <div className="RollDiceField">
                <label>Wounds:</label>
                <input
                    type="number"
                    value={wounds}
                    onChange={(e) => setWounds(e.target.value)}
                /> 
            </div>

            <div className="RollDiceField">
                <label>Sample size:</label>
                <input
                    type="number"
                    value={N}
                    onChange={(e) => setN(e.target.value)}
                /> 
            </div>
        </div>
        <button onClick={handleRoll}>Roll</button>
        {result && (
            <div>
                <p className="statBox statHits">Hits: {result.avgHits}</p>
                <p className="statBox statLethals">Lethal Hits: {result.avgLethalHits}</p>
                <p className="statBox statDevs">Devastating Wounds: {result.avgDevastatingWounds}</p>
                <p className="statBox statWounds">Total Wounds: {result.avgWounds}</p>
                <p className="statBox statFailedSaves">Failed saves: {result.avgFailedSaves}</p>
                <p className="statBox statDamage">Total damage: {result.avgTotalDamage}</p>
                <p className="statBox statKilled">Models killed: {result.avgModelsKilled}</p>
            
                <ResultsBarChart result={result} />

                <h2>Profile Ratings</h2>

                
                
            </div>
        )}
    </div>
    );
}



export default RollDice;