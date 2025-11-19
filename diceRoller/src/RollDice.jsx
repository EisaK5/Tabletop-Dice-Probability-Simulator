//RollDice.js 
import { useState } from "react";
import { resolveAttack } from "./diceLogic.jsx";
import './RollDice.css'

function RollDice() {

const [attacks, setAttacks] = useState(10);
const [bsWs, setSkill] = useState(3);
const [strength, setStrength] = useState(4);
const [toughness, setToughness] = useState(4);
const [save, setSave] = useState(3);
const [invuln, setInvuln] = useState(4);
const [ap, setAp] = useState(0);
const [damage, setDamage] = useState(2);
const [wounds, setWounds] = useState(4);
const [sustainedHits, setSustainedHits] = useState(0);
const [lethalHits, setLethalHits] = useState(false);
const [criticalHit, setCriticalHit] = useState(6);
const [criticalWound, setCriticalWound] = useState(6);
const [rerollHits, setRerollHits] = useState("");
const [rerollWounds, setRerollWounds] = useState("");
const [devastatingWounds, setDevastatingWounds] = useState(false);

const [result, setResult] = useState(null);

function handleRoll() {
    const r = resolveAttack({attacks, bsWs, strength, toughness, save, invuln, ap, damage, wounds, sustainedHits, lethalHits, criticalHit, criticalWound, rerollHits, rerollWounds, devastatingWounds});

    setResult(r);
}

return (
    <div  className ="RollDice">
        <label>
            Attacks:
            <input
                type="number"
                value={attacks}
                onChange={(e) => setAttacks(Number(e.target.value))}
            /> 
        </label>

        <label>
            BS/WS:
            <input
                type="number"
                value={bsWs}
                onChange={(e) => setSkill(Number(e.target.value))}
            /> 
        </label>

        <label>
            Stength:
            <input
                type="number"
                value={strength}
                onChange={(e) => setStrength(Number(e.target.value))}
            /> 
        </label>

        <label>
            AP:
            <input
                type="number"
                value={ap}
                onChange={(e) => setAp(Number(e.target.value))}
            /> 
        </label>

        <label>
            Damage:
            <input
                type="number"
                value={damage}
                onChange={(e) => setDamage(Number(e.target.value))}
            /> 
        </label>

        <label>
            sustainedHits:
            <input
                type="number"
                value={sustainedHits}
                onChange={(e) => setSustainedHits(Number(e.target.value))}
            />
        </label>
        <label>
            lethalHits:
            <input
                type="checkbox"
                checked={lethalHits}
                onChange={(e) => setLethalHits(e.target.checked)} 
            />
        </label>
        <label>
            CriticalHit:
            <input
                type="number"
                check={criticalHit}
                onChange={(e) => setCriticalHit(Number(e.target.value))}
            />
        </label>
        <label>
            rerollHits:
        </label>
        <select value={rerollHits} onChange={(e) => setRerollHits(e.target.value)}>
            <option value="">No hit rolls</option>
            <option value="rollOne">Hit rolls of 1</option>
            <option value="failedHitRolls">Reroll failed hit rolls</option>
            <option value="nonHitCritRoll">Reroll non critical rolls</option>
        </select>
        <label>
            CriticalWound:
            <input
                type="number"
                check={criticalWound}
                onChange={(e) => setCriticalWound(Number(e.target.value))}
            />
        </label>
        <label>
            devastatingWounds:
            <input
                type="checkbox"
                checked={devastatingWounds}
                onChange={(e) => setDevastatingWounds(e.target.checked)}
            />
        </label>
        <label>
            rerollWounds:
        </label>
        <select value={rerollWounds} onChange={(e) => setRerollWounds(e.target.value)}>
            <option value="">No wound rolls</option>
            <option value="rollOne">Wound rolls of 1</option>
            <option value="failedWoundRolls">Reroll failed wound rolls</option>
            <option value="nonWoundCritRoll">Reroll non critical rolls</option>
        </select>
        
        <label>
            Toughness:
            <input
                type="number"
                value={toughness}
                onChange={(e) => setToughness(Number(e.target.value))}
            /> 
        </label>

        <label>
            Save:
            <input
                type="number"
                value={save}
                onChange={(e) => setSave(Number(e.target.value))}
            /> 
        </label>
        <label>
            Invunerable Save:
            <input
                type="number"
                value={invuln}
                onChange={(e) => setInvuln(Number(e.target.value))}
            /> 
        </label>
        <label>
            Wounds:
            <input
                type="number"
                value={wounds}
                onChange={(e) => setWounds(Number(e.target.value))}
            /> 
        </label>

        <button onClick={handleRoll}>Roll</button>
        {result && (
            <div>
                <p>Hits: {result.hitCount}</p>
                <p>Lethal Hits: {result.lethalWounds}</p>
                <p>Devastating Wounds: {result.devWounds}</p>
                <p>Total Wounds: {result.woundCount}</p>
                <p>Failed saves: {result.failedSaves}</p>
                <p>Total damage: {result.failedSaves * damage}</p>
                <p>Models killed: {result.modelsKilled}</p>
            </div>
        )}
    </div>
    );
}



export default RollDice;