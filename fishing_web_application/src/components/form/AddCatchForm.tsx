"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  Command,
} from "../ui/command";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { useEffect, useState } from "react";

const addCatchFormSchema = z
  .object({
    waterAreaName: z.string().min(1, "A mező kitöltése kötelező"),
    fishType: z.string().min(1, "A mező kitöltése kötelező"),
    weight: z
      .string()
      .regex(new RegExp("^([0-9]+)?[.]?([0-9]+)?$"), "Csak számot tartalmazhat")
      .min(1, "A mező kitöltése kötelező"),
    weightUnit: z.string().min(1, "Kötelező választani a listából"),
    isStored: z.boolean(),
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
    isInjured: z.boolean(),
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
  .refine(
    (data) =>
      (data.weight == "" && data.weightUnit == "") ||
      (data.weight != "" && data.weightUnit != ""),
    {
      message:
        "Ha ez érték vagy a mértékegység meg van adva akkor kötelező kitölteni a párját is!",
      path: ["weight"], // path of error
    }
  );

type area = {
  waterAreaId: string;
  waterAreaName: string;

};
type fish = {
  fishId: string;
  fishName: string;
};

type unit = {
  unitTypeId: string;
  unitAcronyms: string;
  unitName: string;
};

const AddCatchForm = () => {
  const { toast } = useToast();

  const [waterAreas, setWaterAreas] = useState<area[]>([]);
  const [fishType, setFishType] = useState<fish[]>([]);
  const [mass, setMass] = useState<unit[]>([]);
  const [temperature, setTemperature] = useState<unit[]>([]);
  const [length, setLength] = useState<unit[]>([]);
  type formSchema = z.infer<typeof addCatchFormSchema>;

  const defaultValues: Partial<formSchema> = {
    waterAreaName: "",
    fishType: "",
    weight: "",
    weightUnit: "",
    isStored: false,
    length: "",
    lengthUnit: "",
    temperature: "",
    temperatureUnit: "",
    method: "",
    bait: "",
    isInjured: false,
  };

  useEffect(() => {
    async function getRequest() {
      const response = await fetch("/api/fishHandler");
      const data = await response.json();
      setFishType(data.fishes);
    }

    getRequest();
  }, []);

  useEffect(() => {
    async function getRequest() {
      const responseMass = await fetch("/api/unitHandler?type=MASS");
      const responseTemperature = await fetch("/api/unitHandler?type=TEMPERATURE");
      const responseLength = await fetch("/api/unitHandler?type=LENGTH");
      const mass = await responseMass.json();
      const temperature = await responseTemperature.json();
      const length = await responseLength.json();
      if(responseMass.ok){
        setMass(mass.units)
      }
      if(responseTemperature.ok){
        setTemperature(temperature.units)
      }
      if(responseLength.ok){
        setLength(length.units)
      }
    }

    getRequest();
  }, []);


  const getWaterAreaHandler = (value: any) => {
    const getRequest = async () => {
      const response = await fetch("/api/waterAreaHandler?name=" + value);
      const data = await response.json();
      if (response.ok) {
        setWaterAreas(data.areas);
      }
    };

    getRequest();
  };

  const form = useForm<formSchema>({
    resolver: zodResolver(addCatchFormSchema),
    defaultValues,
  });

  const submitHandler = async (values: z.infer<typeof addCatchFormSchema>) => {
    const data = {
      waterAreaName: values.waterAreaName,
      fishType: values.fishType,
      weight: values.weight,
      weightUnit: values.weightUnit,
      isStored: values.isStored,
      length: values.length,
      lengthUnit: values.lengthUnit,
      temperature: values.temperature,
      temperatureUnit: values.temperatureUnit,
      method: values.method,
      bait: values.bait,
      isInjured: values.isInjured,
    };

    console.log(data);
    
    const response = await fetch("/api/fishHandler", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Sikertelen létrehozás!",
        description: (await response.json()).message,
        className: "w-[90%]",
      });
    } else {
      toast({
        variant: "default",
        title: "Sikeres létrehozás",
        description: (await response.json()).message,
        className: "bg-green-600 w-[90%] text-white",
      });
    }
    
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className="space-y-8 w-full sm:w-[500px]"
        >
          <div>
            <h2 className="text-lg font-medium pb-2">Kötelező adatok</h2>
            <Separator />
          </div>
          <FormField
            control={form.control}
            name="waterAreaName"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Vízterület neve</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? waterAreas.find(
                              (area) => area.waterAreaId === field.value
                            )?.waterAreaName
                          : "Select language"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] h-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Vízterület keresése..."
                        className="h-9"
                        onValueChange={getWaterAreaHandler}
                      />
                      <CommandEmpty>Nem található vízterület</CommandEmpty>
                      <CommandGroup className="overflow-scroll">
                        {waterAreas.map((area) => (
                          <CommandItem
                            value={area.waterAreaName}
                            key={area.waterAreaId}
                            onSelect={() => {
                              form.setValue("waterAreaName", area.waterAreaId);
                            }}
                          >
                            {area.waterAreaName}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                area.waterAreaId === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fishType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hal típusa</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Válassza ki hal típusát " />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[200px]">
                    {fishType.map((fish) => (
                      <SelectItem key={fish.fishId} value={fish.fishId}>
                        {fish.fishName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full justify-between">
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem className="pr-2 w-full">
                  <FormLabel>Hal Tömege</FormLabel>
                  <FormControl>
                    <Input placeholder="3" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weightUnit"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Mértékegysége</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="kg" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[200px]">
                    {mass.map((mass) => (
                      <SelectItem key={mass.unitTypeId} value={mass.unitTypeId}>
                        {mass.unitAcronyms + " - " + mass.unitName}
                      </SelectItem>
                    ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="isInjured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Hal állapotának ellenőrzése</FormLabel>
                  <FormDescription>
                    Ha sérülést vagy megbetegedést lát a halon kérjük jelölje be
                    a négyzetet!
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <div>
            <h2 className="text-lg font-medium pb-2">Opcionális adatok</h2>
            <Separator />
          </div>
          <div className="flex w-full justify-between">
            <FormField
              control={form.control}
              name="length"
              render={({ field }) => (
                <FormItem className="pr-2 w-full">
                  <FormLabel>Hal hossza</FormLabel>
                  <FormControl>
                    <Input placeholder="25" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lengthUnit"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Mértékegysége</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="cm" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[200px]">
                    {length.map((length) => (
                      <SelectItem key={length.unitTypeId} value={length.unitTypeId}>
                        {length.unitAcronyms + " - " + length.unitName}
                      </SelectItem>
                    ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full justify-between">
            <FormField
              control={form.control}
              name="temperature"
              render={({ field }) => (
                <FormItem className="pr-2 w-full">
                  <FormLabel>Hőmérséklet</FormLabel>
                  <FormControl>
                    <Input placeholder="18" {...field} />
                  </FormControl>
                  <FormDescription>Időjárási körülmények</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="temperatureUnit"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Mértékegysége</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="celsius" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[200px]">
                    {temperature.map((temperature) => (
                      <SelectItem key={temperature.unitTypeId} value={temperature.unitTypeId}>
                        {temperature.unitAcronyms + " - " + temperature.unitName}
                      </SelectItem>
                    ))}
                    </SelectContent>
                  </Select>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full justify-between">
            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem className="pr-2 w-full">
                  <FormLabel>Módszer</FormLabel>
                  <FormControl>
                    <Input placeholder="Bojlis horgászat" {...field} />
                  </FormControl>
                  <FormDescription>
                    Fogás során alkalmazott módszer
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bait"
              render={({ field }) => (
                <FormItem className="pr-2 w-full">
                  <FormLabel>Etetőanyag / Csali</FormLabel>
                  <FormControl>
                    <Input placeholder="kukorica" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <h2 className="text-lg font-medium pb-2">
              Mentési mód kiválasztása
            </h2>
            <Separator />
          </div>
          <FormField
            control={form.control}
            name="isStored"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Mentési folyamat</FormLabel>
                  <FormDescription>
                    Jelölje ki a négyzetet, ha a fogást a naplóba is rögzíteni
                    szeretné!
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full sm:w-auto">
            Létrehozás
          </Button>
        </form>
      </Form>
      <Toaster />
    </>
  );
};

export default AddCatchForm;
