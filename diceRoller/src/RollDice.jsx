//RollDice.js 
import { useState } from "react";
import { simulateManySequence } from "./diceLogic.jsx";
import './RollDice.css'

function RollDice() {

const [attacks, setAttacks] = useState(10);
const [bsWs, setSkill] = useState(3);
const [strength, setStrength] = useState(4);
const [toughness, setToughness] = useState(4);
const [save, setSave] = useState(3);
const [invuln, setInvuln] = useState(4);
const [fnp, setFnp] = useState(0);
const [ap, setAp] = useState(0);
const [damage, setDamage] = useState(1);
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
    //const r = resolveAttack({attacks, bsWs, strength, toughness, save, invuln, fnp, ap, damage, wounds, sustainedHits, lethalHits, criticalHit, criticalWound, rerollHits, rerollWounds, devastatingWounds});
    const r = simulateManySequence({attacks, bsWs, strength, toughness, save, invuln, fnp, ap, damage, wounds, sustainedHits, lethalHits, criticalHit, criticalWound, rerollHits, rerollWounds, devastatingWounds, N})
    setResult(r);
}

return (
    <div  className="RollDice">
        <h2>Offensive Stats</h2>
        <div className="RollDiceRow">
            <div className="RollDiceField">
                <label>Attacks:</label>
                <input
                    type="number"
                    value={attacks}
                    onChange={(e) => setAttacks(Number(e.target.value))}
                /> 
            </div>

            <div className="RollDiceField">
                <label>BS/WS:</label>
                <input
                    type="number"
                    value={bsWs}
                    onChange={(e) => setSkill(Number(e.target.value))}
                /> 
            </div>

            <div className="RollDiceField">
                <label>Strength:</label>
                <input
                    type="number"
                    value={strength}
                    onChange={(e) => setStrength(Number(e.target.value))}
                /> 
            </div>

            <div className="RollDiceField">
                <label>AP:</label>
                <input
                    type="number"
                    value={ap}
                    onChange={(e) => setAp(Number(e.target.value))}
                /> 
            </div>

            <div className="RollDiceField">
                <label>Damage: </label>
                <input
                    type="number"
                    value={damage}
                    onChange={(e) => setDamage(Number(e.target.value))}
                />
            </div>

            <div className="RollDiceField">
                <label>Sustained Hits:</label>
                <input
                    type="number"
                    value={sustainedHits}
                    onChange={(e) => setSustainedHits(Number(e.target.value))}
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
                    onChange={(e) => setCriticalHit(Number(e.target.value))}
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
                    onChange={(e) => setCriticalWound(Number(e.target.value))}
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
                    onChange={(e) => setToughness(Number(e.target.value))}
                />
            </div>

            <div className="RollDiceField">
                <label>Save:</label>
                <input
                    type="number"
                    value={save}
                    onChange={(e) => setSave(Number(e.target.value))}
                /> 
            </div>

            <div className="RollDiceField">
                <label>Invunerable Save:</label>
                <input
                    type="number"
                    value={invuln}
                    onChange={(e) => setInvuln(Number(e.target.value))}
                /> 
            </div>

            <div className="RollDiceField">
                <label>Feel no pain:</label>
                <input
                    type="number"
                    value={fnp}
                    onChange={(e) => setFnp(Number(e.target.value))}
                />
            </div>

            <div className="RollDiceField">
                <label>Wounds:</label>
                <input
                    type="number"
                    value={wounds}
                    onChange={(e) => setWounds(Number(e.target.value))}
                /> 
            </div>

            <div className="RollDiceField">
                <label>Sample size:</label>
                <input
                    type="number"
                    value={N}
                    onChange={(e) => setN(Number(e.target.value))}
                /> 
            </div>
        </div>
        <button onClick={handleRoll}>Roll</button>
        {result && (
            <div>
                <p>Hits: {result.avgHits}</p>
                <p>Lethal Hits: {result.avgLethalHits}</p>
                <p>Devastating Wounds: {result.avgDevastatingWounds}</p>
                <p>Total Wounds: {result.avgWounds}</p>
                <p>Total saves: {result.avgSaves}</p>
                <p>Failed saves: {result.avgFailedSaves}</p>
                <p>Total damage: {result.avgModelsKilled * damage}</p>
                <p>Models killed: {result.avgModelsKilled}</p>
            </div>
        )}
    </div>
    );
}



export default RollDice;