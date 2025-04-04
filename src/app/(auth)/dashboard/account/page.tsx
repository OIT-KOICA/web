/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useToast } from "@/lib/hooks/use-toast";
import {
  useEditCompany,
  useEditPassword,
  useEditProfile,
  useGetCities,
  useGetCompany,
  useGetProfile,
} from "@/lib/query/configuration-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Phones from "@/components/auth/account/phones";
import { Checkbox } from "@/components/ui/checkbox";
import {
  compressFile,
  compressImage,
  compressPDF,
  isFileSizeValid,
} from "@/lib/utils";
import { CompanyDTO, UserDTO } from "@/types/typeDTO";
import { Loader2 } from "lucide-react";

const services = [
  { value: "PRODUCTEUR", label: "Producteur" },
  { value: "TRANSFORMATEUR", label: "Transformateur" },
  { value: "COLLECTEUR", label: "Collecteur" },
  { value: "GROSSISTE", label: "Grossiste" },
  { value: "DETAILLANT", label: "Détailant" },
  { value: "ACTEUR_EXTERNE", label: "Acteur Externe" },
];

export default function AccountPage() {
  const { toast } = useToast();
  const { cities } = useGetCities();
  const { company } = useGetCompany();
  const { user } = useGetProfile();

  // 🔥 Récupération des informations de l'utilisateur
  const [userProfile, setUserProfile] = useState<UserDTO>({
    username: user?.username ?? "",
    email: user?.email ?? "",
    firstname: user?.firstname ?? "",
    lastname: user?.lastname ?? "",
    company: user?.company ?? "",
    roles: user?.roles ?? [],
  });
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🔥 Récupération des informations de la compagnie
  const updateCompany = useEditCompany();
  const updateProfile = useEditProfile();
  const changePassword = useEditPassword();

  const [companyData, setCompanyData] = useState<CompanyDTO>({
    id: company?.id ?? "",
    name: company?.name ?? "",
    email: company?.email ?? "",
    phones: company?.phones ?? [],
    chainValueFunctions: company?.chainValueFunctions ?? [],
    localisation: company?.localisation ?? "",
    serviceType: company?.serviceType ?? "",
    user: company?.user ?? "",
    avatar: company?.avatar ?? "",
    createdAt: company?.createdAt ?? "",
    updatedAt: company?.updatedAt ?? "",
  });

  const [previewImage, setPreviewImage] = useState<string | null>(() => {
    if (company?.avatar instanceof File) {
      // 👇🏼 Si avatar est un File, créer une URL pour l'afficher
      return URL.createObjectURL(company.avatar);
    }

    // 👇🏼 Si avatar est une chaîne, retourner simplement la valeur
    return company?.avatar || null;
  });

  useEffect(() => {
    if (company) {
      setCompanyData({
        id: company.id ?? "",
        name: company.name ?? "",
        email: company.email ?? "",
        phones: company.phones ?? [],
        chainValueFunctions: company.chainValueFunctions ?? [],
        localisation: company.localisation ?? "",
        serviceType: company.serviceType ?? "",
        user: company.user ?? "",
        avatar: company.avatar ?? "",
        createdAt: company.createdAt ?? "",
        updatedAt: company.updatedAt ?? "",
      });
    }
  }, [company]);

  useEffect(() => {
    if (user) {
      setUserProfile({
        username: user.username ?? "",
        email: user.email ?? "",
        firstname: user.firstname ?? "",
        lastname: user.lastname ?? "",
        company: user.company ?? "",
        roles: user.roles ?? [],
      });
    }
  }, [user]);

  // Fonction pour enregistrer les modifications utilisateur
  const handleSaveProfile = async () => {
    setIsSubmitting(true);
    try {
      await updateProfile.mutateAsync({
        data: {
          username: userProfile.username,
          lastname: userProfile.lastname,
          firstname: userProfile.firstname,
        },
      });

      toast({
        title: "Succès",
        description: "Profil mis à jour avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le profil.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fonction pour modifier le mot de passe de l'utilisateur
  const handleChangePassword = async () => {
    setIsSubmitting(true);
    try {
      await changePassword.mutateAsync({
        data: {
          password: password,
        },
      });

      toast({
        title: "Succès",
        description: "Mot de passe mis à jour avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le mot de passe.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fonction pour enregistrer les modifications de la compagnie
  const handleSaveCompany = async () => {
    setIsSubmitting(true);
    const formData = new FormData();

    formData.append("name", companyData.name);
    formData.append("localisation", companyData.localisation);
    formData.append("serviceType", companyData.serviceType);
    formData.append("phones", JSON.stringify(companyData.phones));
    formData.append(
      "chainValueFunctions",
      JSON.stringify(companyData.chainValueFunctions)
    );

    if (companyData.email) formData.append("email", companyData.email);
    if (companyData.avatar && companyData.avatar instanceof File)
      formData.append("file", companyData.avatar);

    try {
      await updateCompany.mutateAsync({ formData: formData });
      toast({
        title: "Succès",
        description: "Informations de l'entreprise mises à jour.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour l'entreprise.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Accueil</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Compte</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="container mx-auto p-4">
        <div className="flex flex-col gap-12">
          {/* Carte utilisateur */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-bold">Mon Compte</h2>
            </CardHeader>
            <CardContent>
              <div className="mt-4 grid gap-4">
                <div>
                  <label className="block text-sm font-medium">
                    Nom d&apos;utilisateur
                  </label>
                  <Input
                    value={userProfile.username}
                    onChange={(e) =>
                      setUserProfile({
                        ...userProfile,
                        username: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <Input value={userProfile.email} disabled />
                </div>
                <div>
                  <label className="block text-sm font-medium">Nom(s)</label>
                  <Input
                    value={userProfile.firstname}
                    onChange={(e) =>
                      setUserProfile({
                        ...userProfile,
                        firstname: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Prénom(s)</label>
                  <Input
                    value={userProfile.lastname}
                    onChange={(e) =>
                      setUserProfile({
                        ...userProfile,
                        lastname: e.target.value,
                      })
                    }
                  />
                </div>
                <Button onClick={handleSaveProfile} disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                  )}
                  Enregistrer
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Carte mot de passe */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-bold">Modifier le mot de passe</h2>
            </CardHeader>
            <CardContent>
              <div className="mt-4 grid gap-4">
                <div>
                  <label className="block text-sm font-medium">
                    Nouveau mot de passe
                  </label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button onClick={handleChangePassword} disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                  )}
                  Modifier le mot de passe
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Carte entreprise */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-bold">
                Informations sur l&apos;entreprise
              </h2>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex flex-col items-center">
                  <Avatar className="size-24">
                    <AvatarImage
                      src={`${process.env.NEXT_PUBLIC_API_PATH_URL}/media/download/image/${previewImage}`}
                    />
                    <AvatarFallback>
                      {companyData.name.substring(0, 1).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <input
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
                        } else {
                          compressedFile = await compressFile(file);
                        }

                        if (!(compressedFile instanceof File)) {
                          compressedFile = new File(
                            [compressedFile],
                            file.name,
                            {
                              type: file.type,
                            }
                          );
                        }

                        setCompanyData({
                          ...companyData,
                          avatar: compressedFile.name,
                        });
                        const reader = new FileReader();
                        reader.onload = () =>
                          setPreviewImage(reader.result as string);
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Nom de l&apos;entreprise
                  </label>
                  <Input
                    value={companyData.name}
                    onChange={(e) =>
                      setCompanyData({ ...companyData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <Input
                    value={companyData.email}
                    onChange={(e) =>
                      setCompanyData({
                        ...companyData,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <Phones
                  phones={companyData.phones}
                  setPhones={(phones) =>
                    setCompanyData({ ...companyData, phones })
                  }
                />

                {/* 🌍 Zone de localisation */}
                <div>
                  <label className="block text-sm font-medium">
                    Localisation
                  </label>
                  <Select
                    value={companyData.localisation ?? ""}
                    onValueChange={(value) =>
                      setCompanyData({ ...companyData, localisation: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une ville" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities?.map((city) => (
                        <SelectItem key={city.id} value={city.name}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Type d&apos;entreprise
                  </label>
                  <Select
                    value={companyData.serviceType ?? ""}
                    onValueChange={(value) =>
                      setCompanyData({
                        ...companyData,
                        serviceType: value,
                        chainValueFunctions: [],
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="COMMERCANT">Commerçant</SelectItem>
                      <SelectItem value="SUPPORT">
                        Service d&apos;accompagnement aux entreprises (SAE)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Rôles dans la chaîne de valeur */}
                <div>
                  <label className="block text-sm font-medium">
                    Rôles dans la chaîne de valeur
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {services.map((service, index) => {
                      const isDisabled =
                        companyData.serviceType === "SUPPORT" &&
                        service.value !== "ACTEUR_EXTERNE";
                      const isHidden =
                        !companyData.serviceType ||
                        (companyData.serviceType === "COMMERCANT" &&
                          service.value === "ACTEUR_EXTERNE");

                      return !isHidden ? (
                        <div key={index} className="flex items-center gap-2">
                          <Checkbox
                            disabled={isDisabled}
                            checked={companyData.chainValueFunctions?.includes(
                              service.value
                            )}
                            onCheckedChange={(checked) => {
                              const updatedRoles = checked
                                ? [
                                    ...companyData.chainValueFunctions,
                                    service.value,
                                  ]
                                : companyData.chainValueFunctions.filter(
                                    (v) => v !== service.value
                                  );
                              setCompanyData({
                                ...companyData,
                                chainValueFunctions: updatedRoles,
                              });
                            }}
                          />
                          <span>{service.label}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
                <Button onClick={handleSaveCompany} disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                  )}
                  Enregistrer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  );
}
