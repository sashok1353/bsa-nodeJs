export function getDamage(attacker, defender) {
  // return damage
  const hitPower = getHitPower(attacker);
  const blockPower = getBlockPower(defender);

  return hitPower > blockPower ? hitPower - blockPower : 0;
}

export function getHitPower(fighter) {
  // return hit power
  const hitPower = fighter.power;
  return hitPower;
}

export function getBlockPower(fighter) {
  // return block power
  const blockPower = fighter.defense;
  return blockPower;
}
