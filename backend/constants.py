import os

ALGOMA = "algoma"
BRANT = "brant"
BRUCE = "bruce"
CHATHAM_KENT = "chatham_kent"
COCHRANE = "cochrane"
DUFFERIN = "dufferin"
DURHAM = "durham"
ELGIN = "elgin"
ESSEX = "essex"
FRONTENAC = "frontenac"
GREATER_SUDBURY = "greater_sudbury"
GREY = "grey"
HALDIMAND_NORFOLK = "haldimand_norfolk"
HALIBURTON = "haliburton"
HALTON = "halton"
HAMILTON = "hamilton"
HASTINGS = "hastings"
HURON = "huron"
KAWARTHA_LAKES = "kawartha_lakes"
KENORA = "kenora"
LAMBTON = "lambton"
LANARK = "lanark"
LEEDS_AND_GRENVILLE = "leeds_and_grenville"
LENNOX_AND_ADDINGTON = "lennox_and_addington"
MANITOULIN = "manitoulin"
MIDDLESEX = "middlesex"
MUSKOKA = "muskoka"
NIAGARA = "niagara"
NIPISSING = "nipissing"
NORTHUMBERLAND = "northumberland"
OTTAWA = "ottawa"
OXFORD = "oxford"
PARRY_SOUND = "parry_sound"
PEEL = "peel"
PERTH = "perth"
PETERBOROUGH = "peterborough"
PRESCOTT_AND_RUSSELL = "prescott_and_russell"
PRINCE_EDWARD = "prince_edward"
RAINY_RIVER = "rainy_river"
RENFREW = "renfrew"
SIMCOE = "simcoe"
STORMONT_DUNDAS_GLENGARRY  = "stormont_dundas_glengarry"
SUDBURY = "sudbury"
THUNDER_BAY  = "thunder_bay"
TIMISKAMMING  = "timiskaming"
TORONTO = "toronto"
WATERLOO = "waterloo"
WELLINGTON = "wellington"
YORK = "york"

CENSUS_DIVISION_TO_ID = {
        ALGOMA: 3557,
        BRANT: 3529,
        BRUCE: 3541,
        CHATHAM_KENT: 3536,
        COCHRANE: 0,
        DUFFERIN: 3522,
        DURHAM: 3518,
        ELGIN: 3534,
        ESSEX: 3537,
        FRONTENAC: 3510,
        GREATER_SUDBURY: 3553,
        GREY: 3542,
        HALDIMAND_NORFOLK: 3528,
        HALIBURTON: 3546,
        HALTON: 3524,
        HAMILTON: 3525,
        HASTINGS: 3512,
        HURON: 3540,
        KAWARTHA_LAKES: 3516,
        KENORA: 1,
        LAMBTON: 3538,
        LANARK: 3509,
        LEEDS_AND_GRENVILLE: 3507,
        LENNOX_AND_ADDINGTON: 3511,
        MANITOULIN: 3551,
        MIDDLESEX: 3539,
        MUSKOKA: 3544,
        NIAGARA: 3526,
        NIPISSING: 3548,
        NORTHUMBERLAND: 3514,
        OTTAWA: 3506,
        OXFORD: 3532,
        PARRY_SOUND: 3549,
        PEEL: 3521,
        PERTH: 3531,
        PETERBOROUGH: 3515,
        PRESCOTT_AND_RUSSELL: 2,
        PRINCE_EDWARD: 3513,
        RAINY_RIVER: 3,
        RENFREW: 3547,
        SIMCOE: 3543,
        STORMONT_DUNDAS_GLENGARRY: 4,
        SUDBURY: 3552,
        THUNDER_BAY: 5,
        TIMISKAMMING: 6,
        TORONTO: 3520,
        WATERLOO: 3530,
        WELLINGTON: 3523,
        YORK: 3519,
}

ID_TO_CENSUS_DIVISION = {
        3557: ALGOMA,
        3529: BRANT,
        3541: BRUCE,
        3536: CHATHAM_KENT,
        0: COCHRANE,
        3522: DUFFERIN,
        3518: DURHAM,
        3534: ELGIN,
        3537: ESSEX,
        3510: FRONTENAC,
        3553: GREATER_SUDBURY,
        3542: GREY,
        3528: HALDIMAND_NORFOLK,
        3546: HALIBURTON,
        3524: HALTON,
        3525: HAMILTON,
        3512: HASTINGS,
        3540: HURON,
        3516: KAWARTHA_LAKES,
        1: KENORA,
        3538: LAMBTON,
        3509: LANARK,
        3507: LEEDS_AND_GRENVILLE,
        3511: LENNOX_AND_ADDINGTON,
        3551: MANITOULIN,
        3539: MIDDLESEX,
        3544: MUSKOKA,
        3526: NIAGARA,
        3548: NIPISSING,
        3514: NORTHUMBERLAND,
        3506: OTTAWA,
        3532: OXFORD,
        3549: PARRY_SOUND,
        3521: PEEL,
        3531: PERTH,
        3515: PETERBOROUGH,
        2: PRESCOTT_AND_RUSSELL,
        3513: PRINCE_EDWARD,
        3 : RAINY_RIVER,
        3547: RENFREW,
        3543: SIMCOE,
        4: STORMONT_DUNDAS_GLENGARRY,
        3552: SUDBURY,
        5: THUNDER_BAY,
        6: TIMISKAMMING,
        3520: TORONTO,
        3530: WATERLOO,
        3523: WELLINGTON,
        3519: YORK
}

CENSUS_FILE_PATH = {
        ALGOMA: "algoma/algoma_census_2016.csv",
        BRANT: "brant/brant_census_2016.csv",
        BRUCE: "census_divisions/bruce_2016.csv",
        CHATHAM_KENT: "chatham_kent/chatham_kent_census_2016.csv",
        COCHRANE: "census_divisions/cochrane_2016.csv",
        DUFFERIN: "census_divisions/dufferin_2016.csv",
        DURHAM: "census_divisions/durham_2016.csv",
        ELGIN: "census_divisions/elgin_2016.csv",
        ESSEX: "census_divisions/essex_2016.csv",
        FRONTENAC: "census_divisions/frontenac_2016.csv",
        GREATER_SUDBURY: "census_divisions/greater_sudbury_2016.csv",
        GREY: "census_divisions/grey_2016.csv",
        HALDIMAND_NORFOLK: "census_divisions/haldimand_norfolk_2016.csv",
        HALIBURTON: "census_divisions/haliburton_2016.csv",
        HALTON: "census_divisions/halton_2016.csv",
        HAMILTON: "census_divisions/hamilton_2016.csv",
        HASTINGS: "census_divisions/hastings_2016.csv",
        HURON: "census_divisions/huron_2016.csv",
        KAWARTHA_LAKES: "census_divisions/kawartha_lakes_2016.csv",
        KENORA: "census_divisions/kenora_2016.csv",
        LAMBTON: "census_divisions/lambton_2016.csv",
        LANARK: "census_divisions/lanark_2016.csv",
        LEEDS_AND_GRENVILLE: "census_divisions/leeds_and_grenville_2016.csv",
        LENNOX_AND_ADDINGTON: "census_divisions/lennox_and_addington_2016.csv",
        MANITOULIN: "census_divisions/manitoulin_2016.csv",
        MIDDLESEX: "census_divisions/middlesex_2016.csv",
        MUSKOKA: "census_divisions/muskoka_2016.csv",
        NIAGARA: "census_divisions/niagara_2016.csv",
        NIPISSING: "census_divisions/nipissing_2016.csv",
        NORTHUMBERLAND: "census_divisions/northumberland_2016.csv",
        OTTAWA: "census_divisions/ottawa_2016.csv",
        OXFORD: "census_divisions/oxford_2016.csv",
        PARRY_SOUND: "census_divisions/parry_sound_2016.csv",
        PEEL: "census_divisions/peel_2016.csv",
        PERTH: "census_divisions/perth_2016.csv",
        PETERBOROUGH: "census_divisions/peterborough_2016.csv",
        PRESCOTT_AND_RUSSELL: "census_divisions/prescott_and_russell_2016.csv",
        PRINCE_EDWARD: "census_divisions/prince_edward_2016.csv",
        RAINY_RIVER: "census_divisions/rainy_river_2016.csv",
        RENFREW: "census_divisions/renfrew_2016.csv",
        SIMCOE: "census_divisions/simcoe_2016.csv",
        STORMONT_DUNDAS_GLENGARRY : "census_divisions/stormont_dundas_glengarry_2016.csv",
        SUDBURY: "census_divisions/sudbury_2016.csv",
        THUNDER_BAY : "census_divisions/thunder_bay_2016.csv",
        TIMISKAMMING : "census_divisions/timiskaming_2016.csv",
        TORONTO: "census_divisions/toronto_2016.csv",
        WATERLOO: "census_divisions/waterloo_2016.csv",
        WELLINGTON: "census_divisions/wellington_2016.csv",
        YORK: "census_divisions/york_2016.csv"
}

SERVICE_PROVIDER_DATA_PATH = os.getenv("PROJECTROOT") + "/scripts/service_provider_data.csv"
CENSUS_DIVISION_DATA_PATH = os.getenv("PROJECTROOT") + "/data/census_divisions/"

SERVICE_PROVIDER_FIELDS = ['name', 'website', 'report_year', 'report_link', 'expenses', 'client_total', 'staff_total', 'is_bookmarked', 'notes']

FIREBASE_AUTH_FILE_PATH = os.getenv("PROJECTROOT") + "/../instance/c4k-dashboard-firebase-adminsdk-ypbc3-c66b8c5a1c.json"
