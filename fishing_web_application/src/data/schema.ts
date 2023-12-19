import { z } from "zod"

export const catchInLogBookSchema = z.object({
  id: z.string(),
  fishName: z.string(),
  fishImageUrl: z.string(),
  date: z.date(),
  weight: z.string(),
  weightUnit: z.string(),
  length: z.string().nullable(),
  lengthUint: z.string().nullable(),
  waterAreaCode: z.string().nullable(),
  waterAreaName: z.string().nullable(),
})

export const modifySavedCatchSchema = z.object({
  catchId: z
    .string(),
  length: z
    .string()
    .regex(new RegExp("^([0-9]+)?[.]?([0-9]+)?$"), "Csak számot tartalmazhat")
    .optional(),
  lengthUnit: z.string().optional(),
  temperature: z
    .string()
    .regex(new RegExp("^([0-9]+)?[.]?([0-9]+)?$"), "Csak számot tartalmazhat")
    .optional(),
  temperatureUnit: z.string().optional(),
  method: z.string().optional(),
  bait: z.string().optional(),
})
  .refine(
    (data) =>
      (data.length == "" && data.lengthUnit == "") ||
      (data.length != "" && data.lengthUnit != ""),
    {
      message:
        "Ha ez érték vagy a mértékegység meg van adva akkor kötelező kitölteni a párját is!",
      path: ["length"], // path of error
    }
  )
  .refine(
    (data) =>
      (data.temperature == "" && data.temperatureUnit == "") ||
      (data.temperature != "" && data.temperatureUnit != ""),
    {
      message:
        "Ha ez érték vagy a mértékegység meg van adva akkor kötelező kitölteni a párját is!",
      path: ["temperature"], // path of error
    }
  )

export type CatchInLogBookSchema = z.infer<typeof catchInLogBookSchema>

export const fischeryAuthorityTableSchema = z.object({
  fisheryAuthorityId: z.string(),
  fisheryAuthorityName: z.string(),
  taxId: z.string(),
  location: z.string(),
  numberOfMembers: z.string()
})

export type FisheryAuthorityTableSchema = z.infer<typeof fischeryAuthorityTableSchema>

export const updateAuthorityFormSchema = z.object({
  fisheryAuthorityId: z.string(),
  fisheryAuthorityName: z
    .string()
    .min(5, "Az egyesület nevének minimun 5 karakter kell tartalmazzon").optional().or(z.literal('')),
  taxId: z
    .string()
    .regex(new RegExp("^[0-9]*$"), "Csak számot tartalmazhat")
    .min(11, "A mezőnek 11 számot kell tartalmaznia")
    .max(12).optional().or(z.literal('')),
  cityName: z
    .string()
    .min(3, "A város nevének minimum 3 karater husszúságúnak kell lennie").optional().or(z.literal('')),
  streetName: z.string().min(1, "A közterület nevét kötelező kitölteni!").optional().or(z.literal('')),
  streetNumber: z.string().min(1, "A közterület számát kötelező kitölteni!").optional().or(z.literal('')),
  floor: z.string().optional(),
  door: z.string().optional(),
});


export const createPostFormSchema = z
  .object({
    title: z.string().min(5, "A bejegyzés címét kötelező megadni és minimum 5 karaktert kell tartalmazzon").max(25),
    description: z.string().min(45, "A bejegyzés törzsét kötelező megadni  és minimum 45 karaktert kell tartalmazzon").max(1000)
  })

export const updatePostFormSchema = z
  .object({
    eventId: z.string().min(1, "A bejegyzés azonosítóját kötelező megadni"),
    title: z.string().min(5, "A bejegyzés címét kötelező megadni és minimum 5 karaktert kell tartalmazzon").max(25),
    description: z.string().min(45, "A bejegyzés törzsét kötelező megadni  és minimum 45 karaktert kell tartalmazzon").max(1000)
  })

export const createTournamentFormSchema = z.object({
  tournamentName: z
    .string()
    .min(3, "A versenynévnek minimum 3 karakterből kell állnia"),
  tournamentDescription: z
    .string()
    .min(45, "A verseny leírását kötelező megadni és minimum 45 karaktert kell tartalmazzon").max(1000),
  deadline: z.date({
    required_error: "Az jelentkezési határidő kitöltése kötelező!",
  }),
  startDate: z.date({
    required_error: "Az kezdési időpont kitöltése kötelező!",
  }),

  maxParticipants: z.string()
    .regex(new RegExp("^[0-9]*$"), "Csak számot tartalmazhat a mező!")
    .min(
      1,
      "A mező kitöltése kötelező!"
    ),
  tournamentType: z
    .string()
    .min(1, "A verseny kategóriáját kötelező megadni!"),
  fishType: z
    .string()
    .min(1, "A verseny során értékelendő hal típusát kötelező megadni!"),
});


export const participantFormSchema = z
  .object({
    eventId: z.string().min(1)
})


export const updateTournamentFormSchema = z.object({
  tournamentId:z.string().min(1),
  tournamentName: z
    .string()
    .min(3, "A versenynévnek minimum 3 karakterből kell állnia"),
  tournamentDescription: z
    .string()
    .min(45, "A verseny leírását kötelező megadni és minimum 45 karaktert kell tartalmazzon").max(1000),
  deadline: z.date({
    required_error: "Az jelentkezési határidő kitöltése kötelező!",
  }),
  startDate: z.date({
    required_error: "Az kezdési időpont kitöltése kötelező!",
  }),
  maxParticipants: z.string()
    .regex(new RegExp("^[0-9]*$"), "Csak számot tartalmazhat a mező!")
    .min(
      1,
      "A mező kitöltése kötelező!"
    ),
  tournamentType: z
    .string()
    .min(1, "A verseny kategóriáját kötelező megadni!"),
  fishType: z
    .string()
    .min(1, "A verseny során értékelendő hal típusát kötelező megadni!"),
});

export const userTableSchema = z.object({
  userId: z.string(),
  userName: z.string(),
  email:z.string(),
  firstName: z.string(),
  lastName: z.string(),
  logBookId: z.string(),
  expiresDate: z.date(),
  haveAccessToPost: z.boolean(),
  haveAccessToTournament: z.boolean(),
  haveAccessToFishing: z.boolean(),
});

export type UserTableSchema = z.infer<typeof userTableSchema>


export const updateUserByAdminFormSchema = z.object({
  userId: z.string().min(1),
  userName: z.string().min(3),
  email:z.string().email({
    message: "Érvénytelen e-mail cím",
  }),
  firstName: z.string(),
  lastName: z.string(),
  expiresDate: z.date(),
  haveAccessToPost: z.boolean(),
  haveAccessToTournament: z.boolean(),
  haveAccessToFishing: z.boolean(),
});

export type UpdateUserByAdminFormSchema = z.infer<typeof userTableSchema>

export const updateUserProfileFormSchema = z.object({
  userName: z.string().min(3),
  email:z.string().email({
    message: "Érvénytelen e-mail cím",
  }),
});

export type UpdateUserProfileFormSchema = z.infer<typeof userTableSchema>