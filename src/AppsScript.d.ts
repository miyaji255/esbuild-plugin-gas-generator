// Type definitions for Google Apps Script 2024-12-16T12:01:53.567Z
// Generated from: https://raw.githubusercontent.com/SchemaStore/schemastore/refs/heads/master/src/schemas/json/appsscript.json

/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface JSONSchemaForGoogleAppsScriptManifestFiles {
  /**
   * Version of the server to use when executing this project.
   */
  runtimeVersion?: "STABLE" | "V8" | "DEPRECATED_ES5";
  /**
   * The script time zone in one of the available ZoneId values such as "America/Denver".
   */
  timeZone?: string;
  dependencies?: Dependencies;
  webapp?: Script;
  /**
   * The location where exceptions are logged.
   */
  exceptionLogging?: "NONE" | "STACKDRIVER";
  /**
   * The definition of authorization scopes used by the script project.
   */
  oauthScopes?: string[];
  /**
   * A list of HTTPS URL prefixes. If present, any URL endpoint fetched must match one of the prefixes in this list. This can help to protect user data.
   */
  urlFetchWhitelist?: string[];
  executionApi?: ApiOptions;
  sheets?: SheetManifest;
  dataStudio?: AddOnManifest;
  addOns?: AddOns;
  [k: string]: unknown;
}
/**
 * A list of advanced services and libraries.
 */
export interface Dependencies {
  /**
   * The list of advanced services enabled for use by the script project.
   */
  enabledAdvancedServices?: AdvancedService[];
  /**
   * The list of libraries used by the script project.
   */
  libraries?: Library[];
  [k: string]: unknown;
}
/**
 * A single advanced service.
 */
export interface AdvancedService {
  /**
   * The identifier used to refer to this service in the code of the Apps Script project.
   */
  userSymbol: string;
  /**
   * The identifier of the service that is shown in the API discovery document (e.g., drive).
   */
  serviceId: string;
  /**
   * The enabled version of the service (e.g., "v1").
   */
  version: string;
  [k: string]: unknown;
}
/**
 * A single library.
 */
export interface Library {
  /**
   * The label that is used in the script project code to refer to this library.
   */
  userSymbol: string;
  /**
   * The script ID of the library's script project. You can find a script ID in the library script's URL or in the script editor by selecting **File > Project properties**.
   */
  libraryId: string;
  /**
   * The version of the library that is used by the script. This is either a version number or stable, meaning the last version created.
   */
  version: string;
  /**
   * If true, version is ignored and the script uses the current library project saved code, even if that code has not been saved to a new version.
   */
  developmentMode?: boolean;
  [k: string]: unknown;
}
/**
 * The script project's web app configuration. Only used if the project is deployed as a web app.
 */
export interface Script {
  /**
   * The levels of permission for running the web app.
   */
  access?: "MYSELF" | "DOMAIN" | "ANYONE" | "ANYONE_ANONYMOUS";
  /**
   * The identity under which the web app executes.
   */
  executeAs?: "USER_ACCESSING" | "USER_DEPLOYING";
  [k: string]: unknown;
}
/**
 * The script project's API executable configuration. Only used if the project is deployed for API execution.
 */
export interface ApiOptions {
  /**
   * Determines who has permission to run the script from the API.
   */
  access?: "MYSELF" | "DOMAIN" | "ANYONE" | "ANYONE_ANONYMOUS";
  [k: string]: unknown;
}
/**
 * Defines manifest values specific to Sheets.
 */
export interface SheetManifest {
  /**
   * A list of defined macros and their associated properties.
   */
  macros?: Macros[];
  [k: string]: unknown;
}
/**
 * A defined macros and it's associated properties.
 */
export interface Macros {
  /**
   * The name of the macro as it appears in the Google Sheets UI.
   */
  menuName: string;
  /**
   * The name of the Apps Script function that executes the macro. By default this matches the menuName for functions automatically created, but this is not a requirement.
   */
  functionName: string;
  /**
   * Defines the keyboard shortcut that executes the macro. This must be of the form Ctrl+Alt+Shift+Number, where Number is a single-digit. Macros without shortcuts can only be executed from the Tools > Macros menu.
   */
  defaultShortcut: string;
  [k: string]: unknown;
}
/**
 * Data Studio add-on manifest.
 */
export interface AddOnManifest {
  /**
   * Display name for add-on.
   */
  name: string;
  /**
   * URL for logo image of add-on.
   */
  logoUrl: string;
  /**
   * Company name for the add-on.
   */
  company: string;
  addonUrl?: string;
  companyUrl?: string;
  /**
   * URL for support information of the add-on.
   */
  supportUrl: string;
  /**
   * Short description about the add-on.
   */
  description: string;
  /**
   * List of sources or services that can be accessed with this add-on.
   */
  sources?: string[];
  templates?: Templates;
  /**
   * Even shorter description used in gallery cards. Only a maximum of 114 characters will be shown on the card.
   */
  shortDescription?: string;
  /**
   * List of AuthTypes supported.
   */
  authType?: ("NONE" | "KEY" | "USER_PASS" | "OAUTH2")[];
  /**
   * Url for privacy policy information about the add-on.
   */
  privacyPolicyUrl?: string;
  /**
   * Url for terms of service information about the add-on.
   */
  termsOfServiceUrl?: string;
  [k: string]: unknown;
}
/**
 * Map of template name to report ID.
 */
export interface Templates {
  [k: string]: unknown;
}
/**
 * G Suite Add-ons
 */
export interface AddOns {
  common?: CommonOptions;
  gmail?: AddOnMetadata;
  calendar?: CalendarMetadata;
  sheets?: AddOnOptions;
  [k: string]: unknown;
}
/**
 * Common properties between all G Suite add-on types.
 */
export interface CommonOptions {
  /**
   * The add-on name.
   */
  name: string;
  /**
   * The logo URL.
   */
  logoUrl: string;
  layoutProperties?: LayoutOptions;
  homepageTrigger?: HomepageTrigger;
  /**
   * Universal add-on actions
   */
  universalActions?: Actions[];
  /**
   * Link prefixes.
   */
  openLinkUrlPrefixes?: string[];
  /**
   * Use the locale from the host application?
   */
  useLocaleFromApp?: boolean;
  [k: string]: unknown;
}
/**
 * Layout properties.
 */
export interface LayoutOptions {
  /**
   * The color of toolbar. Defaults to grey (#424242).
   */
  primaryColor?: string;
  /**
   * The default color of buttons. Defaults to the primary color (if it is set); otherwise defaults to blue (#2196F3).
   */
  secondaryColor?: string;
  [k: string]: unknown;
}
/**
 * Homepage trigger data
 */
export interface HomepageTrigger {
  /**
   * Whether or not homepage (non-contextual) cards are enabled. Defaults to true.
   */
  enabled?: boolean;
  /**
   * The name of the function to run
   */
  runFunctions?: string;
  [k: string]: unknown;
}
/**
 * Actions
 */
export interface Actions {
  /**
   * The action label.
   */
  label?: string;
  /**
   * The link's URL
   */
  openLink?: string;
  /**
   * Required for each defined universal action if openLink is not present. If provided, the name of the Apps Script function that executes when the user selects this action.
   */
  runFunction?: string;
  [k: string]: unknown;
}
/**
 * Gmail add-on metadata.
 */
export interface AddOnMetadata {
  /**
   * Contextual triggers.
   */
  contextualTriggers?: ContextualTrigger[];
  homepageTrigger?: HomepageTrigger1;
  [k: string]: unknown;
}
/**
 * A contextual trigger.
 */
export interface ContextualTrigger {
  /**
   * The name of the Apps Script function that executes when this contextual trigger fires (that is, when a message is opened in Gmail). The function specified here must build and return an array of Card objects.
   */
  onTriggerFunction?: string;
  unconditional?: Unconditional;
  [k: string]: unknown;
}
/**
 * Used to specify that the contextual trigger is fired for all Gmail messages. This is currently the only option, so this should always be an empty object.
 */
export interface Unconditional {
  [k: string]: unknown;
}
/**
 * The trigger function specification for creating the add-on homepage in the Gmail host.
 */
export interface HomepageTrigger1 {
  /**
   * Whether or not homepage (non-contextual) cards are enabled in Gmail. Defaults to true.
   */
  enabled?: boolean;
  /**
   * The name of the function to run when this trigger fires. You must implement this function in your add-on project. This function must build and return an array of Card objects.
   */
  runFunction?: string;
  [k: string]: unknown;
}
/**
 * Calendar add-on metadata.
 */
export interface CalendarMetadata {
  homepageTrigger?: HomepageTrigger2;
  eventOpenTrigger?: Event;
  eventUpdateTrigger?: Event1;
  /**
   * Handler access to Calendar event
   */
  eventAccess?: "METADATA" | "READ" | "WRITE" | "READ_WRITE";
  [k: string]: unknown;
}
/**
 * The trigger function specification for creating the add-on homepage in the Calendar host.
 */
export interface HomepageTrigger2 {
  /**
   * Whether or not homepage (non-contextual) cards are enabled in Calendar. Defaults to true.
   */
  enabled?: boolean;
  /**
   * The name of the function to run when this trigger fires. You must implement this function in your add-on project. This function must build and return an array of Card objects.
   */
  runFunction?: string;
  [k: string]: unknown;
}
/**
 * When a Calendar event is opened
 */
export interface Event {
  /**
   * Event handler function
   */
  runFunction?: string;
  [k: string]: unknown;
}
/**
 * When a Calendar event is updated
 */
export interface Event1 {
  /**
   * Event handler function
   */
  runFunction?: string;
  [k: string]: unknown;
}
/**
 * Configurations for the Google Workspace Add-on's appearance and behavior within the Sheets host application.
 */
export interface AddOnOptions {
  homepageTrigger?: HomepageTrigger3;
  onFileScopeGrantedTrigger?: ContextualTrigger1;
}
/**
 * The Google Workspace add-on manifest configuration for homepage triggers.
 */
export interface HomepageTrigger3 {
  /**
   * Whether or not homepage (non-contextual) cards are enabled in Calendar. Defaults to true.
   */
  enabled?: boolean;
  /**
   * The name of the function to run when this trigger fires. You must implement this function in your add-on project. This function must build and return an array of Card objects.
   */
  runFunction?: string;
  [k: string]: unknown;
}
/**
 * A configuration for a contextual trigger that fires when the add-on presents the request file scope dialog.
 */
export interface ContextualTrigger1 {
  runFunction?: string;
  [k: string]: unknown;
}
