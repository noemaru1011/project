import { useEffect, useState } from "react";
import { SubCategoryApi } from "@/api/subCategoryApi";
import type { SubCategory } from "@shared/schemas/SubCategory";

export function SubCategoryHooks() {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await SubCategoryApi.index();
        console.log("Fetched sub-categories:", data);
        setSubCategories(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { subCategories, loading, error };
}
