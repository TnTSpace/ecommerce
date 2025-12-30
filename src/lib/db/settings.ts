import { BaseCRUD, eq, type CRUDResult } from "./crud";
import { settings, type Settings, type NewSettings } from "./schema";
import { db } from "./drizzle";

const GLOBAL_SETTINGS_ID = "global";

class SettingsCRUDClass extends BaseCRUD<typeof settings, Settings, NewSettings> {
  constructor() {
    super(settings);
  }

  /**
   * Get global settings
   */
  async getGlobal(): Promise<CRUDResult<Settings>> {
    try {
      let [result] = await db
        .select()
        .from(settings)
        .where(eq(settings.id, GLOBAL_SETTINGS_ID))
        .limit(1);

      // Create default settings if none exist
      if (!result) {
        [result] = await db
          .insert(settings)
          .values({
            id: GLOBAL_SETTINGS_ID,
            storeName: "My Store",
            storeEmail: "store@example.com",
            currency: "NGN",
          })
          .returning();
      }

      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Failed to get settings" };
    }
  }

  /**
   * Update global settings
   */
  async updateGlobal(data: Partial<NewSettings>): Promise<CRUDResult<Settings>> {
    try {
      const [result] = await db
        .update(settings)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(settings.id, GLOBAL_SETTINGS_ID))
        .returning();

      if (!result) {
        // Create if doesn't exist
        return this.getGlobal();
      }

      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Failed to update settings" };
    }
  }

  /**
   * Update store info
   */
  async updateStoreInfo(info: {
    storeName?: string;
    storeEmail?: string;
    storePhone?: string;
    storeAddress?: Settings["storeAddress"];
  }): Promise<CRUDResult<Settings>> {
    return this.updateGlobal(info);
  }

  /**
   * Update shipping rates
   */
  async updateShippingRates(rates: Settings["shippingRates"]): Promise<CRUDResult<Settings>> {
    return this.updateGlobal({ shippingRates: rates });
  }

  /**
   * Update social links
   */
  async updateSocialLinks(links: Settings["socialLinks"]): Promise<CRUDResult<Settings>> {
    return this.updateGlobal({ socialLinks: links });
  }

  /**
   * Toggle maintenance mode
   */
  async toggleMaintenanceMode(enabled: boolean): Promise<CRUDResult<Settings>> {
    return this.updateGlobal({ maintenanceMode: enabled });
  }

  /**
   * Update tax rate
   */
  async updateTaxRate(rate: string): Promise<CRUDResult<Settings>> {
    return this.updateGlobal({ taxRate: rate });
  }

  /**
   * Check if store is in maintenance mode
   */
  async isInMaintenance(): Promise<boolean> {
    try {
      const result = await this.getGlobal();
      return result.data?.maintenanceMode || false;
    } catch {
      return false;
    }
  }
}

export const SettingsCRUD = new SettingsCRUDClass();
