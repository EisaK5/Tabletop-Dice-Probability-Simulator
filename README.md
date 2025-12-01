# 40k-Dice-Roller
dice roller for popular table top game warhammer 40k
-uses 6 sided dice rolls 
-Utilizes monte carlo simulation to simulate dice rolls required to simulate an attack sequence in the game

Sequence steps
-hit phase: attacks are rolled to hit using input ballistic skill(BS, for shooting attacks) or weapon skill(WS, for weapon attacks). Ex: BS = 2+ all dice hit on a 2+

-wound phase: successful hits are rolled to wound against target value. Target value is the strength of the weapon compared against the toughness of the unit.
If strength is 2x toughness, target value = 2+
If strengh is less than 2x toughness but still greater than toughness, target value = 3+
If strength equals toughness, target value = 4+
If strength is less than toughness, target value = 5+
if strength is 2x less than toughness, target value = 6+
Ex: Strength = 7, Toughness = 5 => target value = 3+

-save phase
successful wounds now roll for a save roll so damage can be avoided.
save is input by the player but can be worsened due to the input Armor Penetrations(AP) characteristc
Ex: Save = 3+, rolls 2, wound roll nulled. 
    Save = 4+, AP 2, save changed to 6+, rolls 5, wound goes through
    
-damage phase
now damage is applied to model. the model has a wound characteristic so wound - damage, if damage >= wound then the model is defeated.
