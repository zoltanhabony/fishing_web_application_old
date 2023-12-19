import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { Toaster } from "../ui/toaster";
import { modifySavedCatchSchema } from "@/data/schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";


type unit = {
  unitTypeId: string;
  unitAcronyms: string;
  unitName: string;
};

interface ModifySavedCatchFormProps  {
    catchId: string
}

const ModifySavedCatchForm : React.FC<ModifySavedCatchFormProps> = ({catchId}) => {
  const [temperature, setTemperature] = useState<unit[]>([]);
  const [length, setLength] = useState<unit[]>([]);
  type formSchema = z.infer<typeof modifySavedCatchSchema>;
  const router = useRouter()

  const defaultValues: Partial<formSchema> = {
    catchId:catchId,
    length: "",
    lengthUnit: "",
    temperature: "",
    temperatureUnit: "",
    method: "",
    bait: "",
  };

  useEffect(() => {
    async function getRequest() {
      const responseTemperature = await fetch(
        "/api/unitHandler?type=TEMPERATURE"
      );
      const responseLength = await fetch("/api/unitHandler?type=LENGTH");
      const temperature = await responseTemperature.json();
      const length = await responseLength.json();
      if (responseTemperature.ok) {
        setTemperature(temperature.units);
      }
      if (responseLength.ok) {
        setLength(length.units);
      }
    }
    getRequest();
  }, []);

  const submitHandler = async (
    values: z.infer<typeof modifySavedCatchSchema>
  ) => {
    const data = {
      catchId: values.catchId,
      length: values.length,
      lengthUnit: values.lengthUnit,
      temperature: values.temperature,
      temperatureUnit: values.temperatureUnit,
      method: values.method,
      bait: values.bait,
    };

    const response = await fetch("/api/logBookHandler/isSaved", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Sikertelen módosítás!",
        description: (await response.json()).message,
        className: "w-[90%]",
      });
    } else {
      toast({
        variant: "default",
        title: "Sikeres módosítás!",
        description: (await response.json()).message,
        className: "bg-green-600 w-[90%] text-white",
      });
      router.push("/dashboard")
    }
  };

  const form = useForm<formSchema>({
    resolver: zodResolver(modifySavedCatchSchema),
    defaultValues,
  });
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className="space-y-8 w-full sm:w-[500px]"
        >
          <div>
            <h2 className="text-lg font-medium pb-2">Opcionális adatok</h2>
            <p className="text-xs pb-2 text-gray-500">Csak az opcionális adatokat lehet módosítani</p>
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
                        <SelectValue
                          className="placeholder-red-300"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[200px]">
                      {length.map((length) => (
                        <SelectItem
                          key={length.unitTypeId}
                          value={length.unitTypeId}
                        >
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
                  <FormDescription className="text-xs">Időjárási körülmények</FormDescription>
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
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[200px]">
                      {temperature.map((temperature) => (
                        <SelectItem
                          key={temperature.unitTypeId}
                          value={temperature.unitTypeId}
                        >
                          {temperature.unitAcronyms +
                            " - " +
                            temperature.unitName}
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
                  <FormDescription className="text-xs">
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
          <Button type="submit" className="w-full sm:w-auto">
            Módosítás
          </Button>
        </form>
      </Form>
      <Toaster />
    </>
  );
};


export default ModifySavedCatchForm