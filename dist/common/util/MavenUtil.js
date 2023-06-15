"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MavenUtil = void 0;
const path_1 = require("path");
const url_1 = require("url");
class MavenUtil {
    static ID_REGEX = /([^@:]+):([^@:]+):?([^@:]+)?:?(?:([^@:]+))?:?(?:@{1}([^@:]+))?/;
    static mavenComponentsToIdentifier(group, artifact, version, classifier, extension) {
        return `${group}:${artifact}:${version}${classifier != null ? `:${classifier}` : ''}${extension != null ? `@${extension}` : ''}`;
    }
    static mavenComponentsToExtensionlessIdentifier(group, artifact, version, classifier) {
        return MavenUtil.mavenComponentsToIdentifier(group, artifact, version, classifier);
    }
    static mavenComponentsToVersionlessIdentifier(group, artifact) {
        return `${group}:${artifact}`;
    }
    static isMavenIdentifier(id) {
        return MavenUtil.ID_REGEX.test(id);
    }
    static getMavenComponents(id, extension = 'jar') {
        if (!MavenUtil.isMavenIdentifier(id)) {
            throw new Error('Id is not a maven identifier.');
        }
        const result = MavenUtil.ID_REGEX.exec(id);
        if (result != null) {
            return {
                group: result[1],
                artifact: result[2],
                version: result[3],
                classifier: result[4],
                extension: result[5] || extension
            };
        }
        throw new Error('Failed to process maven data.');
    }
    static mavenIdentifierAsPath(id, extension = 'jar') {
        const tmp = MavenUtil.getMavenComponents(id, extension);
        return MavenUtil.mavenComponentsAsPath(tmp.group, tmp.artifact, tmp.version, tmp.classifier, tmp.extension);
    }
    static mavenComponentsAsPath(group, artifact, version, classifier, extension = 'jar') {
        return `${group.replace(/\./g, '/')}/${artifact}/${version}/${artifact}-${version}${classifier != null ? `-${classifier}` : ''}.${extension}`;
    }
    static mavenIdentifierToUrl(id, extension = 'jar') {
        return new url_1.URL(MavenUtil.mavenIdentifierAsPath(id, extension));
    }
    static mavenComponentsToUrl(group, artifact, version, classifier, extension = 'jar') {
        return new url_1.URL(MavenUtil.mavenComponentsAsPath(group, artifact, version, classifier, extension));
    }
    static mavenIdentifierToPath(id, extension = 'jar') {
        return (0, path_1.normalize)(MavenUtil.mavenIdentifierAsPath(id, extension));
    }
    static mavenComponentsAsNormalizedPath(group, artifact, version, classifier, extension = 'jar') {
        return (0, path_1.normalize)(MavenUtil.mavenComponentsAsPath(group, artifact, version, classifier, extension));
    }
}
exports.MavenUtil = MavenUtil;
