import { PrismaClient, WaterAreaType } from "@prisma/client";

import waterAreas from "./waterAreas.json";
import postalCodes from "./postalCodes.json"
import fishes from "./fishes.json"
import currency from "./currency.json"
import unit from "./unit.json"
import { UnitType } from "@prisma/client";

type currency = {
    "Valuta neve": string,
    "Valuta rövidítése": string
}

type unitType = {
    unitType: string,
    unitName: string,
    unitAcronyms: string
}

type newUnitType = {
    unitType: UnitType,
    unitName: string,
    unitAcronyms: string
}


type newCurrency = {
    currencyName: string,
    currencyAcronyms: string
}

type fish = {
    "Hal kódja": string,
    "Hal neve": string,
    "Súly korlátozás": string,
    "Hossz korlátozás": string,
    "Mennyiség korlázotás": string,
    "Tilalmi időszak kezdete": string,
    "Tilalmi időszak vége": string,
    "Kép elérés út": string
}

type newFish = {
    fishCode: number | undefined,
    fishName: string,
    weightLimit: number | undefined,
    lengthLimit: number | undefined,
    pieceLimit: number | undefined,
    banPeriodStart: string,
    banPeriodEnd: string,
    fishImageUrl: string
}

type area = {
    "Víztérkód": string
    "Vízterület neve": string
    "Vízterület típusa": string,
}

type newArea = {
    waterAreaCode: string
    waterAreaName: string
    waterAreaType: WaterAreaType
}

type postalCode = {
    "Irányítószám": string
    "Település": string
    "Megye": string
}

type newPostalCode = {
    postalCode: number
    cityName: string
    countyName: string
}

const db = new PrismaClient();
let target: number;
const seed = async () => {
    let newWaterArea: newArea[] = []

    let newPostalCode: newPostalCode[] = []

    let newFish: newFish[] = []

    let newCurrency: newCurrency[] = []

    let newUnit: newUnitType[] = []

    waterAreas.map((area: area) => {
        let waterAreaType
        if (area["Vízterület típusa"] === "folyóvíz") {
            waterAreaType = WaterAreaType.STILL_WATER
        } else {
            waterAreaType = WaterAreaType.RIVER_WATER
        }
        newWaterArea.push({
            waterAreaCode: area.Víztérkód,
            waterAreaName: area["Vízterület neve"],
            waterAreaType: waterAreaType
        })
    })

    postalCodes.map((city: postalCode) => {
        target = Number(city.Irányítószám)
        newPostalCode.push({
            postalCode: Number(city.Irányítószám),
            cityName: city.Település,
            countyName: city.Megye
        })
    })

    fishes.map((fish: fish) => {
        newFish.push({
            fishCode: Number(fish["Hal kódja"]) ? Number(fish["Hal kódja"]) : undefined,
            fishName: fish["Hal neve"],
            weightLimit: Number(fish["Súly korlátozás"]) ? Number(fish["Súly korlátozás"]) : undefined,
            lengthLimit: Number(fish["Hossz korlátozás"]) ? Number(fish["Hossz korlátozás"]) : undefined,
            pieceLimit: Number(fish["Mennyiség korlázotás"]) ? Number(fish["Mennyiség korlázotás"]) : undefined,
            banPeriodStart: fish["Tilalmi időszak kezdete"],
            banPeriodEnd: fish["Tilalmi időszak vége"],
            fishImageUrl: fish["Kép elérés út"]
        })
    })

    currency.map((currency: currency) => {
        newCurrency.push({
            currencyName: currency["Valuta neve"],
            currencyAcronyms: currency["Valuta rövidítése"]
        })
    })

    unit.map((unit: unitType) => {
        let type;
        switch (unit.unitType) {
            case "MASS":
                type = UnitType.MASS
                break;
            case "LENGTH":
                type = UnitType.LENGTH
                break;
            case "TEMPERATURE":
                type = UnitType.TEMPERATURE
                break;
            default:
                type = UnitType.MASS
                break;
        }
        newUnit.push({
            unitType: type!,
            unitName: unit.unitName,
            unitAcronyms: unit.unitAcronyms
        })

    })

    
    await db.waterArea.createMany({
        data: newWaterArea
    })

    await db.city.createMany({
        data: newPostalCode
    })
    
    await db.fish.createMany({
        data: newFish
    })
    
    
    await db.currency.createMany({
        data: newCurrency
    })
    

    await db.unit.createMany({
        data: newUnit
    })
    
}

seed().catch((e) => {
    console.error(e)
    console.log(target)

    process.exit(1)
}).finally(async () => {
    db.$disconnect()
})