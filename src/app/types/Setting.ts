import { Data } from './Table';
import TenantComponents from './TenantComponents';

export interface Setting extends Data {
  id: string;
  identifier: TenantComponents;
  sensitiveData: string[];
  category?: 'business' | 'technical';
  content: SettingContent;
}

export interface SettingContent {
  type: CryptoSettingsType | RoamingSettingsType | AnalyticsSettingsType | RefundSettingsType | PricingSettingsType | BillingSettingsType | SmartChargingSettingsType | AssetSettingsType;
  ocpi?: OcpiSetting;
  simple?: SimplePricingSetting;
  convergentCharging?: ConvergentChargingPricingSetting;
  stripe?: StripeBillingSetting;
  sac?: SacAnalyticsSetting;
  links?: SettingLink[];
  concur?: ConcurRefundSetting;
  sapSmartCharging?: SapSmartChargingSetting;
  asset?: AssetSetting;
  crypto?: CryptoSetting;
}

export interface SettingLink extends Data {
  id: string; // 'number' is wrong! See table-data-source.enrichData() which does not digest 'id' field of type 'number'
  name: string;
  description: string;
  role: string;
  url: string;
}

export enum PricingSettingsType {
  SIMPLE = 'simple',
  CONVERGENT_CHARGING = 'convergentCharging',
}

export interface PricingSettings extends Setting {
  identifier: TenantComponents.PRICING;
  type: PricingSettingsType;
  simple: SimplePricingSetting;
  convergentCharging: ConvergentChargingPricingSetting;
}

export interface PricingSetting {
}

export interface SimplePricingSetting extends PricingSetting {
  price: number;
  currency: string;
}

export interface ConvergentChargingPricingSetting extends PricingSetting {
  url: string;
  chargeableItemName: string;
  user: string;
  password: string;
}

export enum RoamingSettingsType {
  GIREVE = 'gireve',
}

export interface RoamingSettings extends Setting {
  identifier: TenantComponents.OCPI;
  type: RoamingSettingsType;
  ocpi: OcpiSetting;
}

export interface OcpiSetting {
  currency: string;
  businessDetails: {
    name: string;
    website: string;
    logo: {
      url: string;
      thumbnail: string;
      category: string;
      type: string;
      width: string;
      height: string;
    }
  };
  cpo: {
    countryCode: string;
    partyID: string;
  };
  emsp: {
    countryCode: string;
    partyID: string;
  };
}

export enum AnalyticsSettingsType {
  SAC = 'sac',
}

export interface AnalyticsSettings extends Setting {
  identifier: TenantComponents.ANALYTICS;
  type: AnalyticsSettingsType;
  sac: SacAnalyticsSetting;
  links: SettingLink[];
}

export interface SacAnalyticsSetting {
  mainUrl: string;
  timezone: string;
}

export enum SmartChargingSettingsType {
  SAP_SMART_CHARGING = 'sapSmartCharging',
}

export interface SmartChargingSettings extends Setting {
  identifier: TenantComponents.SMART_CHARGING;
  type: SmartChargingSettingsType;
  sapSmartCharging?: SapSmartChargingSetting;
}

export interface SapSmartChargingSetting {
  optimizerUrl: string;
  user: string;
  password: string;
  stickyLimitation: boolean;
  limitBufferDC: number;
  limitBufferAC: number;
}

export enum RefundSettingsType {
  CONCUR = 'concur',
}

export interface RefundSettings extends Setting {
  identifier: TenantComponents.REFUND;
  type: RefundSettingsType;
  concur?: ConcurRefundSetting;
}

export interface ConcurRefundSetting {
  authenticationUrl: string;
  apiUrl: string;
  appUrl: string;
  clientId: string;
  clientSecret: string;
  paymentTypeId: string;
  expenseTypeCode: string;
  policyId: string;
  reportName: string;
}

export enum BillingSettingsType {
  STRIPE = 'stripe',
}

export interface BillingSettings extends Setting {
  identifier: TenantComponents.BILLING;
  type: BillingSettingsType;
  stripe: StripeBillingSetting;
}

export interface BillingSetting {
  lastSynchronizedOn?: Date;
}

export interface StripeBillingSetting extends BillingSetting {
  url: string;
  secretKey: string;
  publicKey: string;
  noCardAllowed: boolean;
  immediateBillingAllowed: boolean;
  periodicBillingAllowed: boolean;
  advanceBillingAllowed: boolean;
  currency: string;
  taxID: string;
}

export enum AssetSettingsType {
  ASSET = 'asset',
}

export interface AssetSettings extends Setting {
  identifier: TenantComponents.ASSET;
  type: AssetSettingsType;
  asset?: AssetSetting;
}

export interface AssetSetting {
  connections: AssetConnectionSetting[];
}

export interface AssetConnectionSetting extends Data {
  id: string;
  name: string;
  description: string;
  url: string;
  type: AssetConnectionType;
  connection?: AssetSchneiderConnectionType;
}

export enum AssetConnectionType {
  NONE = '',
  SCHNEIDER = 'schneider',
}

export interface AssetUserPasswordConnectionType {
  user: string;
  password: string;
}

// tslint:disable-next-line: no-empty-interface
export interface AssetSchneiderConnectionType extends AssetUserPasswordConnectionType {
}



export enum CryptoSettingsType {
  CRYPTO = 'crypto',
}

export interface KeySettings extends Setting {
  identifier: TenantComponents.CRYPTO;
  type: CryptoSettingsType;
  crypto?: CryptoSetting;
}

export interface KeyCryptoSetting {
  blockCypher: string;
  blockSize: number;
  operationMode: string;
}

export interface CryptoSetting {
  key: string;
  keyProperties: KeyCryptoSetting;
  formerKey?: string;
  formerKeyProperties?: KeyCryptoSetting;
  migrationToBeDone?: boolean;
}