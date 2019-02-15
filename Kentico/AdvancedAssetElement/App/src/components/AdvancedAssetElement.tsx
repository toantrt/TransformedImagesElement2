﻿import * as React from "react";

import { ContentManagementClient } from "kentico-cloud-content-management";

import { IElement } from "./kentico/IElement";
import { IContext } from "./kentico/IContext";
import { string } from "prop-types";

export interface IElementProps {
    element: IElement;
    context: IContext;
}

export interface IElementState {
    assetURLs: string[];
}

// Expose access to Kentico custom element API
declare const CustomElement: any;

export class AdvancedAssetElement extends React.Component<IElementProps, IElementState> {
    client = new ContentManagementClient({
        projectId: this.props.context.projectId,
        apiKey: this.props.element.config.contentManagementAPIKey
    });

    componentWillMount() {
        this.client.listAssets()
            .toObservable()
            .subscribe(response => {
                this.setState({
                    assetURLs: response.data.items.map(i => `https://assets-us-01.kc-usercontent.com:443/${this.props.context.projectId}/${i.fileReference}/${i.fileName}"`)
                })
                response.data.items
            })
    }

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <h1>Here are some assets</h1>
                <div id="assetList">
                    {this.state.assetURLs.map(u => <img src={u} />)}
                </div>
            </div>);
    }
}