const { FightRepository } = require("../repositories/fightRepository");

class FightersService {
  // OPTIONAL TODO: Implement methods to work with fights
  getAll() {
    const fights = FightRepository.getAll();
    return fights;
  }

  getById(id) {
    const fights = this.search({ id });
    if (!fights) throw new Error("No fight with such id was found");
    return fights;
  }

  create(data) {
    const fight = FightRepository.create(data);
    return fight;
  }

  update(id, data) {
    const found = this.search({ id });
    if (!found) throw new Error("Fight not found");
    const updated = { ...found };
    data.log.forEach((obj) => {
      updated["log"].push(obj);
    });
    const fight = FightRepository.update(id, updated);
    if (!fight) throw new Error("Can not update fight");
    return fight;
  }

  delete(id) {
    if (!this.search({ id })) throw new Error("Figh not found");
    const fight = FightRepository.delete(id);
    return fight;
  }

  search(search) {
    const item = FightRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

module.exports = new FightersService();
