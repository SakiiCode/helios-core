/// <reference types="node" />
import { URL } from 'url';
export interface MavenComponents {
    group: string;
    artifact: string;
    version: string;
    classifier?: string;
    extension: string;
}
export declare class MavenUtil {
    static readonly ID_REGEX: RegExp;
    static mavenComponentsToIdentifier(group: string, artifact: string, version: string, classifier?: string, extension?: string): string;
    static mavenComponentsToExtensionlessIdentifier(group: string, artifact: string, version: string, classifier?: string): string;
    static mavenComponentsToVersionlessIdentifier(group: string, artifact: string): string;
    static isMavenIdentifier(id: string): boolean;
    static getMavenComponents(id: string, extension?: string): MavenComponents;
    static mavenIdentifierAsPath(id: string, extension?: string): string;
    static mavenComponentsAsPath(group: string, artifact: string, version: string, classifier?: string, extension?: string): string;
    static mavenIdentifierToUrl(id: string, extension?: string): URL;
    static mavenComponentsToUrl(group: string, artifact: string, version: string, classifier?: string, extension?: string): URL;
    static mavenIdentifierToPath(id: string, extension?: string): string;
    static mavenComponentsAsNormalizedPath(group: string, artifact: string, version: string, classifier?: string, extension?: string): string;
}
