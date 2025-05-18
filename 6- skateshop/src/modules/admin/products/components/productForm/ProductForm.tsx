"use client";

import { useEffect } from "react";
import { TabsContent } from "@radix-ui/react-tabs";
import { FormProvider } from "react-hook-form";
import { FormHeader } from "../shared/FormHeader";
import { FormTabs } from "../shared/FormTabs";

import { BasicInfoSection } from "./sections/BasicInfoSection";
import { VariantsSection } from "./sections/VariantsSection";
import { ImagesSection } from "./sections/ImagesSection";

import { ProductFormProps } from "../../types/ProductFormTypes";
import { useProductForm } from "../../hooks/useProductForm";
import { tabsConfig } from "../../config/tabsConfig";

export function ProductForm({ onClose, product }: ProductFormProps) {
  const {
    methods,
    isSubmitting,
    handleSubmit,
    handleFormSubmit,
    resetForm,
    activeTab,
    setActiveTab
  } = useProductForm(product, onClose);

  useEffect(() => {
    if (product) {
      resetForm();
    }
  }, [product, resetForm]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = handleSubmit((data) => {
        return handleFormSubmit(data);
      });
      await result(e);
    } catch (error) {
      console.error("Error en el envío del formulario:", error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <FormHeader
        title={product ? "Edit Product" : "Create New Product"}
        onClose={onClose}
        isEdit={!!product}
        isLoading={isSubmitting}
      />

      <FormProvider {...methods}>
        <FormTabs
          tabs={tabsConfig}
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsContent value="basic">
            <BasicInfoSection />
          </TabsContent>

          <TabsContent value="variants">
            <VariantsSection />
          </TabsContent>

          <TabsContent value="images">
            <ImagesSection />
          </TabsContent>
        </FormTabs>
      </FormProvider>
    </form>
  );
}