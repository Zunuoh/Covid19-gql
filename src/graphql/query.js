import { gql } from "apollo-boost";

export const getCountries = gql`
  query {
    countries {
      country
      countryInfo {
        flag
      }
      continent
      result {
        tests
        cases
        todayCases
        deaths
        todayDeaths
        recovered
        active
        critical
        casesPerOneMillion
        deathsPerOneMillion
        testsPerOneMillion
        updated
      }
    }
  }
`;

export const getGlobalData = gql`

query {
  globalTotal {
    affectedCountries
    tests
    cases
    todayCases
    deaths
    todayDeaths
    recovered
    active
    critical
    casesPerOneMillion
    deathsPerOneMillion
    testsPerOneMillion
    updated
  }
}
`;
