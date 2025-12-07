# Warhammer 40k-Dice-Roller
## dice roller for popular table top game warhammer 40k

-uses 6 sided dice rolls 

-Utilizes monte carlo simulation to simulate dice rolls required to simulate an attack sequence in the game

-User inputs sample size, recommended sample size of at least 100 for consistent results. For good measure I would choose 1,000 or 10,000

## Sequence steps

### hit phase
* attacks are rolled to hit using input ballistic skill(BS, for shooting attacks) or weapon skill(WS, for weapon attacks). Ex: BS = 2+ all dice hit on a 2+

  * hits can be rerolled if checkboxed by the user

* two variables can be added to hit rolls to incur certain effects from the outcome of the hitrolls. Sustained Hits, Lethal Hits.

* Definition: A Critical Hit is input by the user (Ex: 5+) incurs the benefits of the variables. Default is 6+

* Sustained Hits: on critical hit, number of hits increased ontop of the current hit. Ex: Sustained hits 2, hit roll of 6, turns 1 successful attack to 3 successful attacks.

* Lethal Hits: on critical hit, hit roll auto wounds, no need to roll for the wound. 


### wound phase
* successful hits are rolled to wound against target value. Target value is the strength of the weapon compared against the toughness of the unit. 

* wounds can be rerolled if checkboxed by the user

If strength is 2x toughness, target value = 2+

If strengh is less than 2x toughness but still greater than toughness, target value = 3+

If strength equals toughness, target value = 4+

If strength is less than toughness, target value = 5+

if strength is 2x less than toughness, target value = 6+

Ex: Strength = 7, Toughness = 5 => target value = 3+

* the wound phase also has a similar concept of critical hits instead called critical wounds, in which it is input by the user.

* Devastating Wounds: on critical wound, the wound roll automatically deals damage skipping the save roll alltogether. However the damage still undergoes feel no pains (reference damage phase).

### save phase

* successful wounds now roll for a save roll so damage can be avoided.
  
* save is input by the player but can be worsened due to the input Armor Penetrations(AP) characteristic
  
Ex: Save = 3+, rolls 2, wound roll nulled. 
    Save = 4+, AP 2, save changed to 6+, rolls 5, wound goes through

* Invulnerable Save: If input by the user, allows a static save roll. Meaning AP has no affect on the save.
    
### damage phase

* now damage is applied to model. the model has a wound characteristic so wound - damage, if damage >= wound then the model is defeated.

* Feel No Pain: Once a model has taken damage, each individial damage value is rolled against a Feel No Pain roll (FNP). if above or greater than the input value damage is nulled. Ex: total damage = 10, fnp = 5+, roll 4 dice above or equal to a 5+ total damage is now 6

* Another aspect of the damage values is that they have the option of being a dice roll. Using D6 or D3 rolls. Ex: 2d6, D6+3, D3, D3+2, 12, etc.
