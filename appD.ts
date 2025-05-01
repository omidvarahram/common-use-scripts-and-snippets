// RNAppDRUMStrategy.ts

import { Instrumentation } from '@appdynamics/react-native-agent';

// Interface for structured metadata
export interface LogMetadata {
  [key: string]: string | number | boolean | undefined;
}

export class RNAppDRUMStrategy {
  private appKey: string;
  private appId: string;
  private environment: string;

  constructor(appKey: string, appId: string, environment: string) {
    this.appKey = appKey;
    this.appId = appId;
    this.environment = environment;
  }

  public async init(): Promise<void> {
    await Instrumentation.start({
      appKey: this.appKey,
      applicationName: this.appId,
      collectorURL: this.getCollectorURL(this.environment),
      loggingLevel: 'INFO',
      interactionCaptureMode: 'None',
    });

    Instrumentation.trackAllErrors();
  }

  private getCollectorURL(environment: string): string {
    switch (environment) {
      case 'production':
        return 'https://production.appdynamics.com';
      case 'staging':
        return 'https://staging.appdynamics.com';
      default:
        return 'https://dev.appdynamics.com';
    }
  }

  private maskSensitiveData(metadata?: LogMetadata): LogMetadata | undefined {
    if (!metadata) return metadata;
    const maskedMetadata: LogMetadata = {};
    for (const [key, value] of Object.entries(metadata)) {
      maskedMetadata[key] = typeof value === 'string' ? value.replace(/.(?=.{4})/g, '*') : value;
    }
    return maskedMetadata;
  }

  public log(message: string, metaData?: LogMetadata, sensitive: boolean = false): void {
    const data = sensitive ? this.maskSensitiveData(metaData) : metaData;
    Instrumentation.leaveBreadcrumb(`LOG: ${message}`, data);
  }

  public logData(dataObj: object, sensitive: boolean = false): void {
    const dataString = JSON.stringify(sensitive ? this.maskSensitiveData(dataObj as LogMetadata) : dataObj);
    Instrumentation.leaveBreadcrumb(`LOG_DATA: ${dataString}`);
  }

  public logInfo(message: string, metaData?: LogMetadata, sensitive: boolean = false): void {
    const data = sensitive ? this.maskSensitiveData(metaData) : metaData;
    Instrumentation.leaveBreadcrumb(`INFO: ${message}`, data);
  }

  public logWarn(message: string, metaData?: LogMetadata, sensitive: boolean = false): void {
    const data = sensitive ? this.maskSensitiveData(metaData) : metaData;
    Instrumentation.leaveBreadcrumb(`WARN: ${message}`, data);
  }

  public logError(
    error: Error,
    severity: 'INFO' | 'WARNING' | 'CRITICAL' = 'CRITICAL',
    metaData?: LogMetadata,
    sensitive: boolean = false
  ): void {
    const data = sensitive ? this.maskSensitiveData(metaData) : metaData;
    Instrumentation.reportError(error, severity, data);
  }

  public startTimer(name: string): void {
    Instrumentation.startTimer(name);
  }

  public stopTimer(name: string): void {
    Instrumentation.stopTimer(name);
  }

  public reportMetric(name: string, value: number): void {
    Instrumentation.reportMetric(name, value);
  }
}
