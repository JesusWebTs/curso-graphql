import { IResolvers } from "graphql-tools";
import data from "../../2-data/data.json";

export const personResolver: IResolvers = {
  Query: {
    getPerson(_: void, args: any): Object {
      const [found] = data.people.filter((p) => p.id === args.id);
      return found;
    },
  },
  Person: {
    __resolveType(obj: any) {
      return obj.age ? "Male" : "Female";
    },
  },
  Male: {
    countries(parent: any) {
      const countries: any = [];
      parent.countries.forEach((countryId: any) =>
        countries.push(...data.countries.filter((c) => c.id === countryId))
      );
      return countries;
    },
  },
  Country: {
    people(parent: any) {
      const chars: any = [];
      parent.people.forEach((charId: any) =>
        chars.push(...data.people.filter((c) => c.id === charId))
      );
      return chars;
    },
  },
};
