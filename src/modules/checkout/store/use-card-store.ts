import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface TenantCard {
  productIds: string[];
}

interface CartState {
  tenantCarts: Record<string, TenantCard>;
  addProduct: (tenantSlug: string, productId: string) => void;
  removeProduct: (tenantSlug: string, productId: string) => void;
  clearCard: (tenantSlug: string) => void;
  clearAllCards: () => void;
  getCartByTenant: (tenantSlug: string) => string[];
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      tenantCarts: {},
      addProduct: (tenantSlug, productId) =>
        set(state => ({
          tenantCarts: {
            ...state.tenantCarts,
            [tenantSlug]: {
              productIds: [
                ...(state.tenantCarts[tenantSlug]?.productIds || []),
                productId
              ]
            }
          }
        })),
      removeProduct: (tenantSlug, productId) =>
        set(state => ({
          tenantCarts: {
            ...state.tenantCarts,
            [tenantSlug]: {
              productIds:
                state.tenantCarts[tenantSlug]?.productIds.filter(
                  id => id !== productId
                ) || []
            }
          }
        })),
      clearCard: tenantSlug =>
        set(state => ({
          tenantCarts: {
            ...state.tenantCarts,
            [tenantSlug]: {
              productIds: []
            }
          }
        })),
      clearAllCards: () => set({ tenantCarts: {} }),
      getCartByTenant: tenantSlug =>
        get().tenantCarts[tenantSlug]?.productIds || []
    }),
    {
      name: "funroad-cart",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
