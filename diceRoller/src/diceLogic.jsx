
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

export function resolveAttack({
    attacks, bsWs, strength, toughness, save, invuln, ap, damage, wounds, sustainedHits, lethalHits, devastatingWounds, criticalHit, criticalWound, rerollHits, rerollWounds, sides = 6,
}) {
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
    for (let i = 0; i < failedSaves; i++) {  //for splash damage
        currentWounds -= damage;

        if (currentWounds <= 0) {
             modelsKilled += 1;
             currentWounds = wounds;
        }


    }

    return {
        hitTarget: bsWs, woundTarget, saveTarget,

        hitRolls, hitCount,

        woundRolls, woundCount, lethalWounds, devWounds,

        saveRolls: saveResult.rolls, saveCount, failedSaves,

        modelsKilled,
    };
}

