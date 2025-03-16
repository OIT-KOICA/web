"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/lib/hooks/use-toast";
import {
  useCreateCompany,
  useGetCities,
} from "@/lib/query/configuration-query";
import { CompanyFormValues, companySchema } from "@/schemas/company-schema";
import Image from "next/image";
import Phones from "../products/phones";
import {
  compressDocx,
  compressFile,
  compressImage,
  compressPDF,
  compressXls,
  isFileSizeValid,
} from "@/lib/utils";
import useStore from "@/lib/stores/store";

const services = [
  { value: "PRODUCTEUR", label: "Producteur" },
  { value: "TRANSFORMATEUR", label: "Transformateur" },
  { value: "COLLECTEUR", label: "Collecteur" },
  { value: "GROSSISTE", label: "Grossiste" },
  { value: "DETAILLANT", label: "Détailant" },
  { value: "ACTEUR_EXTERNE", label: "Acteur Externe" },
];

export default function CreateCompanyModal() {
  const router = useRouter();
  const { toast } = useToast();

  const { cities } = useGetCities();
  const createCompany = useCreateCompany();

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [myCities, setMyCities] = useState<
    {
      id: string;
      name: string;
      region: string;
    }[]
  >([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const store = useStore.getState();

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      email: "",
      phones: [],
      chainValueFunctions: [],
      localisation: "",
      serviceType: "",
      file: undefined,
    },
  });

  const onSubmit: SubmitHandler<CompanyFormValues> = async (
    data: CompanyFormValues
  ) => {
    setIsSubmitting(true);

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("localisation", data.localisation);
    formData.append("serviceType", data.serviceType);
    formData.append("phones", JSON.stringify(data.phones));
    formData.append(
      "chainValueFunctions",
      JSON.stringify(data.chainValueFunctions)
    );

    if (data.email) formData.append("email", data.email);
    if (data.file) formData.append("file", data.file);

    try {
      await createCompany.mutateAsync({
        formData: formData,
      });

      toast({
        title: "Compagnie créée avec succès!",
        description: "Vous pouvez maintenant accèder à votre tableau de bord",
      });

      await store.setStatus();

      router.push("/dashboard");
    } catch (error) {
      console.error("Echec lors de la création de la compagnie:", error);
      toast({
        title: "Erreur",
        description:
          "Echec lors de la création de la compagnie. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (cities) setMyCities(cities);
  }, [cities, myCities]);

  return (
    <Dialog open={true}>
      <DialogContent className="max-h-[90vh] w-full max-w-md overflow-y-auto p-4 sm:max-w-[600px] sm:p-6">
        <DialogHeader>
          <DialogTitle>Créer votre entreprise</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            {/* Nom de l'entreprise */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom de l&apos;entreprise</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Entrer le nom de l'entreprise"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Entrer l'adresse email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Téléphones */}
            <Phones control={form.control} />

            {/* Type de service */}
            <FormField
              control={form.control}
              name="serviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type d&apos;entreprise</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        form.setValue("serviceType", value);
                        setSelectedType(value);
                        form.setValue("chainValueFunctions", []);
                      }}
                      {...field}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selectionnez un type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="COMMERCANT">Commerçant</SelectItem>
                        <SelectItem value="SUPPORT">
                          Service d&apos;accompagnement aux entreprises (SAE)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Chaînes de valeur */}
            <FormField
              control={form.control}
              name="chainValueFunctions"
              render={() => (
                <FormItem>
                  <FormLabel>Rôles dans la chaîne de valeur</FormLabel>
                  <div className="grid grid-cols-2 gap-4">
                    {services.map((service, index) => {
                      const isDisabled =
                        selectedType === "SUPPORT" &&
                        service.value !== "ACTEUR_EXTERNE";
                      const isHidden =
                        !selectedType ||
                        (selectedType === "COMMERCANT" &&
                          service.value === "ACTEUR_EXTERNE");

                      return !isHidden ? (
                        <FormField
                          key={index}
                          control={form.control}
                          name="chainValueFunctions"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={index}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    disabled={isDisabled}
                                    checked={field.value?.includes(
                                      service.value
                                    )}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            service.value,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== service.value
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {service.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ) : null;
                    })}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Zone de localisation */}
            <FormField
              control={form.control}
              name="localisation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zone de localisation</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) =>
                        form.setValue("localisation", value)
                      }
                      {...field}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selectionnez une zone de localisation" />
                      </SelectTrigger>

                      <SelectContent>
                        {cities &&
                          cities.map((city) => (
                            <SelectItem key={city.id} value={city.name}>
                              {city.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image du service */}
            <FormField
              control={form.control}
              name="file"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image de profil</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (!isFileSizeValid(file)) {
                            toast({
                              title: "Erreur",
                              description:
                                "Le fichier ne doit pas dépasser 10 Mo.",
                              variant: "destructive",
                            });
                            return;
                          }
                          let compressedFile = file;

                          if (file.type.includes("image")) {
                            compressedFile = await compressImage(file);
                          } else if (file.type === "application/pdf") {
                            compressedFile = await compressPDF(file);
                          } else if (
                            file.type ===
                              "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                            file.type === "application/msword"
                          ) {
                            compressedFile = await compressDocx(file);
                          } else if (
                            file.type === "application/vnd.ms-excel" ||
                            file.type ===
                              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          ) {
                            compressedFile = await compressXls(file);
                          } else {
                            compressedFile = await compressFile(file);
                          }

                          // Assurer que compressedFile est bien une instance de File
                          if (!(compressedFile instanceof File)) {
                            compressedFile = new File(
                              [compressedFile],
                              file.name,
                              { type: file.type }
                            );
                          }

                          form.setValue("file", compressedFile);
                          const reader = new FileReader();
                          reader.onload = () =>
                            setPreviewImage(reader.result as string);
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </FormControl>

                  {previewImage && (
                    <div className="mt-2">
                      <FormLabel>Aperçu de l&apos;image :</FormLabel>
                      <Image
                        src={previewImage}
                        alt="Aperçu de l'image de profil"
                        className="mt-2 size-24 rounded-full border object-cover"
                        width={100}
                        height={100}
                      />
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Création..." : "Créer l'entreprise"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
