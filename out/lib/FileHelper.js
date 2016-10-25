"use strict";
const fse = require("fs-extra");
const fs = require("fs");
const path = require("path");
const changeCase = require("change-case");
const rxjs_1 = require("rxjs");
class FileHelper {
    static createComponent(componentDir, componentName, config) {
        let templateFileName = this.assetRootDir + '/templates/component.template';
        if (config.template) {
            templateFileName = this.resolveWorkspaceRoot(config.template);
        }
        let componentContent = fs.readFileSync(templateFileName).toString()
            .replace(/{selector}/g, componentName)
            .replace(/{templateUrl}/g, `${componentName}.component.html`)
            .replace(/{styleUrls}/g, `${componentName}.component.css`)
            .replace(/{className}/g, changeCase.pascalCase(componentName));
        let filename = `${componentDir}/${componentName}.component.${config.extension}`;
        if (config.create) {
            return this.createFile(filename, componentContent)
                .map(result => filename);
        }
        else {
            return rxjs_1.Observable.of('');
        }
    }
    ;
    static createModule(componentDir, componentName, config) {
        let templateFileName = this.assetRootDir + '/templates/module.template';
        if (config.template) {
            templateFileName = this.resolveWorkspaceRoot(config.template);
        }
        let moduleContent = fs.readFileSync(templateFileName).toString()
            .replace(/{componentName}/g, componentName)
            .replace(/{className}/g, changeCase.pascalCase(componentName));
        let filename = `${componentDir}/${componentName}.module.${config.extension}`;
        if (config.create) {
            return this.createFile(filename, moduleContent)
                .map(result => filename);
        }
        else {
            return rxjs_1.Observable.of('');
        }
    }
    ;
    static createHtml(componentDir, componentName, config) {
        let templateFileName = this.assetRootDir + '/templates/html.template';
        if (config.template) {
            templateFileName = this.resolveWorkspaceRoot(config.template);
        }
        let htmlContent = fs.readFileSync(templateFileName).toString();
        let filename = `${componentDir}/${componentName}.component.${config.extension}`;
        if (config.create) {
            return this.createFile(filename, htmlContent)
                .map(result => filename);
        }
        else {
            return rxjs_1.Observable.of('');
        }
    }
    ;
    static createCss(componentDir, componentName, config) {
        let templateFileName = this.assetRootDir + '/templates/css.template';
        if (config.template) {
            templateFileName = this.resolveWorkspaceRoot(config.template);
        }
        let cssContent = fs.readFileSync(templateFileName).toString();
        let filename = `${componentDir}/${componentName}.component.${config.extension}`;
        if (config.create) {
            return this.createFile(filename, cssContent)
                .map(result => filename);
        }
        else {
            return rxjs_1.Observable.of('');
        }
    }
    ;
    static createSpec(componentDir, componentName, config) {
        let templateFileName = this.assetRootDir + '/templates/spec.template';
        if (config.template) {
            templateFileName = this.resolveWorkspaceRoot(config.template);
        }
        let specContent = fs.readFileSync(templateFileName).toString();
        let filename = `${componentDir}/${componentName}.component.${config.extension}`;
        if (config.create) {
            return this.createFile(filename, specContent)
                .map(result => filename);
        }
        else {
            return rxjs_1.Observable.of('');
        }
    }
    ;
    static createComponentDir(uri, componentName) {
        let contextMenuSourcePath;
        if (uri && fs.lstatSync(uri).isDirectory()) {
            contextMenuSourcePath = uri;
        }
        else if (uri) {
            contextMenuSourcePath = path.dirname(uri);
        }
        else {
            contextMenuSourcePath = this.atom.workspace.project.rootDirectories[0].path;
        }
        let componentDir = `${contextMenuSourcePath}/${componentName}`;
        fse.mkdirsSync(componentDir);
        return componentDir;
    }
    static getConfig() {
        let content = fs.readFileSync(this.assetRootDir + '/config/config.json').toString();
        content = content.replace(/\${workspaceRoot}/g, this.atom.workspace.project.rootDirectories[0].path);
        return JSON.parse(content);
    }
    static resolveWorkspaceRoot(path) {
        return path.replace('${workspaceRoot}', this.atom.workspace.project.rootDirectories[0].path);
    }
}
exports.FileHelper = FileHelper;
FileHelper.createFile = rxjs_1.Observable.bindNodeCallback(fse.outputFile);
FileHelper.assetRootDir = path.join(__dirname, '../assets');
//# sourceMappingURL=FileHelper.js.map