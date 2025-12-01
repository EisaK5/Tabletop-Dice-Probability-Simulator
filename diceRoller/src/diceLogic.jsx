
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getTarget(strength, toughness) {
    if (strength > toughness) {
        if (strength >= 2 * toughness)
            return 2;
        else
            return 3;
    }
    else if (strength == toughness)
        return 4;
    else {
        if (toughness >= 2 * strength)
            return 6;
        else
            return 5;
    }
}

export function rollAndCountSuccess(numDice, target, sides = 6) {
    const rolls = [];
    let successes = 0;

    for (let i = 0; i < numDice; i++) {
        const value = randomInt(1, sides);
        rolls.push(value);
        if (value >= target) {
            successes += 1;
        }
    }

    return {
        rolls,
        successes,
    };
}

//regex, allows us to search through the text
function parseDamage(str) {
    const regex = /^(\d*)[Dd](\d+)(?:\+(\d+))?$/;
    const match = str.match(regex);

    if (match) {
        const numDice = match[1] || 1;
        const diceSides = match[2];
        const modifier = match[3] || 0;
        return {
            numDice, diceSides, modifier
        };
    }

    return { numDice: 0, diceSides: 0, modifier: Number(str)};
}

function evaluate(damageParsed) {
    const { numDice, diceSides, modifier } = damageParsed;

    if (numDice == 0) {
        return modifier;
    }
    let total = 0;
    for (let i = 0; i < numDice; i++) {
        total += randomInt(1,diceSides);
    }
    return total + modifier;
}

//simulate average function
//number n how many times the attack sequences are looped
//get sums of key variables
//each loop iteration adds to sum
//then divide sum by n thats the average
export function simulateManySequence({
    attacks, bsWs, strength, toughness, save, invuln, fnp, ap, damage, wounds, sustainedHits, lethalHits, criticalHit, criticalWound, rerollHits, rerollWounds, devastatingWounds, N
}) {
    let sumHits = 0;
    let sumLethalHits = 0;
    let sumWounds = 0;
    let sumDevastatingWounds = 0;
    let sumSaves = 0;
    let sumFailedSaves = 0;
    let sumTotalDamage = 0;
    let sumModelsKilled = 0;

    for (let i = 0; i < N; i++) {
        const result = resolveAttack({   attacks,
                                        bsWs,
                                        strength,
                                        toughness,
                                        save,
                                        invuln,
                                        fnp,
                                        ap,
                                        damage,
                                        wounds,
                                        sustainedHits,
                                        lethalHits,
                                        devastatingWounds,
                                        criticalHit,
                                        criticalWound,
                                        rerollHits,
                                        rerollWounds, })
        sumHits += result.hitCount;
        sumLethalHits += result.lethalWounds;
        sumWounds += result.woundCount;
        sumDevastatingWounds += result.devWounds;
        sumSaves += result.saveCount;
        sumFailedSaves += result.failedSaves;
        sumTotalDamage += result.totalDamage;
        sumModelsKilled += result.modelsKilled;
    }

    const avgHits = sumHits / N;
    const avgLethalHits = sumLethalHits / N;
    const avgWounds = sumWounds / N;
    const avgDevastatingWounds = sumDevastatingWounds / N;
    const avgSaves = sumSaves / N;
    const avgFailedSaves = sumFailedSaves / N;
    const avgTotalDamage = sumTotalDamage / N;
    const avgModelsKilled = sumModelsKilled / N;

    return {
        avgHits, avgLethalHits, avgWounds, avgDevastatingWounds, avgSaves, avgFailedSaves, avgTotalDamage, avgModelsKilled,
    };
}

export function resolveAttack({   attacks,
                                        bsWs,
                                        strength,
                                        toughness,
                                        save,
                                        invuln,
                                        fnp,
                                        ap,
                                        damage,
                                        wounds,
                                        sustainedHits,
                                        lethalHits,
                                        devastatingWounds,
                                        criticalHit,
                                        criticalWound,
                                        rerollHits,
                                        rerollWounds,
                                        sides = 6}) {
    //hit roll + sustained hits
    const hitRolls = [];
    let hitCount = 0;
    let lethalWounds = 0;
    for (let  i = 0; i < attacks; i++) {
        //roll a die
        let value = randomInt(1, sides);

        if (rerollHits == "rollOne") {
            if (value == 1)
                value = randomInt(1, sides);
        }
        else if (rerollHits == "failedHitRolls") {
            if (value < bsWs)
                value = randomInt(1, sides);
        }
        else if (rerollHits == "nonHitCritRoll") {
            if ( value < criticalHit)
                value = randomInt(1, sides);
        }
        
        if (value >= bsWs) {
            //lethal hits and sustained hits, add a wound roll and add sustained num to hits
            if (sustainedHits > 0 && lethalHits && value >= criticalHit) { 
                hitCount += sustainedHits;
                lethalWounds += 1;
            } //only lethal hits add a wound roll
            else if (lethalHits && value >= criticalHit)
                lethalWounds += 1;
            else if (sustainedHits > 0 && value >= criticalHit) //only sustained hits 
                hitCount += sustainedHits + 1;
            else //no lethals no sustained
                hitCount += 1;
        }
        hitRolls.push(value); //store role for display
    }
    

    //wound roll
    //const woundTarget = getTarget(strength, toughness);
    //const woundResult = rollAndCountSuccess(hitCount, woundTarget, sides);
    let woundCount = lethalWounds;
    const woundRolls = [];
    const woundTarget = getTarget(strength, toughness);
    let devWounds = 0;
    for (let i = 0; i < hitCount; i++) {
        let value = randomInt(1, sides);

        if (rerollWounds == "rollOne") {
            if (value == 1)
                value = randomInt(1, sides);
        }
        else if (rerollWounds == "failedWoundRolls") {
            if (value < woundTarget)
                value = randomInt(1, sides);
        }
        else if (rerollWounds == "nonWoundCritRoll") {
            if ( value < criticalWound)
                value = randomInt(1, sides);
        }


        if (value >= woundTarget) {
            if (devastatingWounds && value == 6) {
                devWounds += 1;
            }
            else {
                woundCount += 1;
            }
        }

        woundRolls.push(value);
    }


    let saveTarget;
    if (invuln > 0) { //invuln save allows static save
        if (save+ap >= invuln) //if save roll with ap > invuln use invuln
            saveTarget = invuln;
        else //else save roll lower than invuln keep save
            saveTarget = save+ap;
    } else { //no invuln just go to normal save
        saveTarget = save+ap;
    }
        const saveResult = rollAndCountSuccess(woundCount, saveTarget, sides);
        const saveCount = saveResult.successes;
        const failedSaves = (woundCount + devWounds) - saveCount;
    
    let modelsKilled = 0;
    let currentWounds = wounds;
    const damageParsed = parseDamage(damage);
    let totalDamage = 0;
    for (let i = 0; i < failedSaves; i++) {
        let damageNum = evaluate(damageParsed);
        let damageCount = damageNum;
        if (fnp > 0) {
            for (let i = 0; i < damageNum; i++) {
                let value = randomInt(1, sides);
                if (value >= fnp)
                    damageCount--;
            }
        }
        currentWounds -= damageCount;
        totalDamage += damageCount;
        if (currentWounds <= 0) {
                modelsKilled += 1;
                currentWounds = wounds;
            }
    }



    return {
        hitTarget: bsWs, woundTarget, saveTarget,

        hitRolls, hitCount,

        woundRolls, woundCount, lethalWounds, devWounds,

        saveRolls: saveCount, failedSaves,

        totalDamage, modelsKilled,
    };
}

