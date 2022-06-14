const { FighterRepository } = require("../repositories/fighterRepository");

class FighterService {
  // TODO: Implement methods to work with fighters
  getAll() {
    const fighters = FighterRepository.getAll();
    return fighters;
  }

  getById(id) {
    const Fighter = this.search({ id });
    if (!Fighter) throw new Error("Fighter not found");
    return Fighter;
  }

  delete(id) {
    if (!this.search({ id })) throw new Error("Fighter not found");
    const fighter = FighterRepository.delete(id);
    return fighter;
  }

  update(id, data) {
    if (!this.search({ id })) throw new Error("Fighter not found");
    if (data?.name && this.searchByName({ name: data?.name })) {
      throw new Error("Name is already taken");
    }
    const fighter = FighterRepository.update(id, data);
    if (!fighter) throw new Error("Can not update fighter");
    return fighter;
  }

  create(data) {
    const { name } = data;
    if (this.searchByName({ name })) {
      throw new Error("Fighter name is already taken");
    }
    const fighter = FighterRepository.create(data);
    return fighter;
  }

  search(search) {
    const item = FighterRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  searchByName(name) {
    const item = FighterRepository.getOneFighter(name);
    if (!item) {
      return null;
    }
    return item;
  }
}

module.exports = new FighterService();
