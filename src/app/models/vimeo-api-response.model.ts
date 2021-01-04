
export interface VimeoApiResponse {

    categories: [
        {
        icon: {
            active: boolean,
            default_picture: boolean,
            link: string,
            resource_key: string,
            sizes: [
                {
                    height: number,
                    link: string,
                    link_with_play_button: string,
                    width: number
                }
            ],
            type: string,
            uri: string
        },
        is_deprecated: boolean,
        last_video_featured_time: Date,
        link: string,
        metadata: {
            connections: {
                [key: string]: {
                    options: [ string ],
                    total: number,
                    uri: string
                }
            },
            interactions: {
            follow: {
                added: boolean,
                added_time: Date,
                uri: string
                }
            }
        },
        name: string,
        parent: {
            link: string,
            name: string,
            uri: string
        },
        pictures: {
            active: boolean,
            default_picture: boolean,
            link: string,
            resource_key: string,
            sizes: [
                {
                    height: number,
                    link: string,
                    link_with_play_button: string,
                    width: number
                }
            ],
            type: string,
            uri: string
        },
        resource_key: string,
        subcategories: [
            {
            link: string,
            name: string,
            uri: string
            }
        ],
        top_level: boolean,
        uri: string
        }
    ];
    content_rating: [ string ];
    context: {
        action: string,
        resource: [  ],
        resource_type: string
    };
    created_time: Date;
    description: string;
    duration: number;
    embed: [
        {
        buttons: {
            embed: boolean,
            fullscreen: boolean,
            hd: boolean,
            like: boolean,
            scaling: boolean,
            share: boolean,
            watchlater: boolean
        },
        color: string,
        logos: {
            custom: {
            active: boolean,
            link: string,
            sticky: boolean,
            url: string
            },
            vimeo: boolean
        },
        playbar: boolean,
        speed: boolean,
        title: {
            name: string,
            owner: string,
            portrait: string
        },
        uri: string,
        volume: boolean
        }
    ];
    height: number;
    is_playable: boolean;
    language: string;
    last_user_action_event_date: Date;
    license: string;
    link: string;
    metadata: {
        connections: {
            [key: string]: {
                options: [ string ],
                total: number,
                uri: string
            },
            versions: {
                current_uri: string,
                options: [ string ],
                resource_key: string,
                total: number,
                uri: string
            }
        },
        interactions: {
            album: {
                options: [ string ],
                uri: string
            },
            buy: {
                currency: string,
                display_price: number,
                download: string,
                drm: boolean,
                link: string,
                price: number,
                purchase_time: Date,
                stream: string,
                uri: string
            },
            channel: {
                options: [ string ],
                uri: string
            },
            delete: {
                options: [ string ],
                uri: string
            },
            edit: {
                options: [ string ],
                uri: string
            },
            like: {
                added: boolean,
                added_time: string,
                options: [ string ],
                uri: string
            },
            rent: {
                currency: string,
                display_price: number,
                drm: boolean,
                expires_time: Date,
                link: string,
                price: number,
                purchase_time: Date,
                stream: string,
                uri: string
            },
            report: {
                options: [ string ],
                reason: [ string ],
                uri: string
            },
            subscribe: {
                drm: boolean,
                expires_time: Date,
                purchase_time: Date,
                stream: string
            },
            view_team_members: {
                options: [ string ],
                uri: string
            },
            watched: {
                added: boolean,
                added_time: string,
                options: [ string ],
                uri: string
            },
            watchlater: {
                added: boolean,
                added_time: string,
                options: [ string ],
                uri: string
            }
        }
    };
    modified_time: Date;
    name: string;
    parent_folder: [
        {
        created_time: Date,
        last_user_action_event_date: Date,
        link: string,
        metadata: {
            connections: {
                [key: string]: {
                    options: [ string ],
                    total: 12,
                    uri: string
                }
            }
        },
        modified_time: Date,
        name: string,
        privacy: { view: string },
        resource_key: string,
        uri: string,
        user: {
            account: string,
            available_for_hire: boolean,
            bio: string,
            can_work_remotely: boolean,
            clients: string,
            content_filter: [  ],
            created_time: string,
            gender: string,
            link: string,
            location: string,
            location_details: [
                {
                    city: string,
                    country: string,
                    country_iso_code: string,
                    formatted_address: string,
                    latitude: string,
                    longitude: string,
                    neighborhood: string,
                    state: string,
                    state_iso_code: string,
                    sub_locality: string
                }
            ],
            metadata: {
            connections: {
                [key: string]: {
                    options: [ string ],
                    total: number,
                    uri: string
                },
            },
            interactions: {
                add_privacy_user: {
                    options: [ string ],
                    uri: string
                },
                block: {
                    added: boolean,
                    added_time: Date,
                    options: [ string ],
                    uri: string
                },
                connected_apps: {
                    all_scopes: [  ],
                    is_connected: boolean,
                    needed_scopes: [  ],
                    options: [ string ],
                    uri: string
                },
                follow: {
                    added: boolean,
                    options: [ string ],
                    uri: string
                },
                report: {
                    options: [ string ],
                    reason: [ string ],
                    uri: string
                }
            },
            public_videos: {
                total: number
            }
            },
            name: string,
            pictures: {
                active: boolean,
                default_picture: boolean,
                link: string,
                resource_key: string,
                sizes: [
                    {
                        height: number,
                        link: string,
                        link_with_play_button: string,
                        width: number
                    }
                ],
                type: string,
                uri: string
            },
            preferences: {
            videos: {
                privacy: {
                password: string
                }
            }
            },
            resource_key: string,
            short_bio: string,
            skills: {
                name: string,
                uri: string
            },
            upload_quota: {
                lifetime: {
                    free: number,
                    max: number,
                    used: number
                },
                periodic: {
                    free: number,
                    max: number,
                    reset_date: Date,
                    used: number
                },
                space: {
                    free: number,
                    max: number,
                    showing: string,
                    used: number
                }
            },
            uri: string,
            websites: [
                {
                    description: string,
                    link: string,
                    name: string,
                    type: string,
                    uri: string
                }
            ]
        }
        }
    ];
    password: string;
    pictures: {
        active: boolean,
        default_picture: boolean,
        link: string,
        resource_key: string,
        sizes: [
            {
                height: number,
                link: string,
                link_with_play_button: string,
                width: number
            }
        ],
        type: string,
        uri: string
    };
    privacy: {
        add: boolean,
        comments: string,
        download: boolean,
        embed: string,
        view: string
    };
    release_time: Date;
    resource_key: string;
    spatial: {
        director_timeline: [
        {
            pitch: number,
            roll: number,
            time_code: number,
            yaw: number
        }
        ],
        field_of_view: number,
        projection: string,
        stereo_format: string
    };
    stats: { plays: number };
    status: string;
    tags: [
        {
            canonical: string,
            metadata: {
                connections: {
                    [key: string]: {
                        options: [ string ],
                        total: number,
                        uri: string
                    }
                }
            },
            name: string,
            resource_key: string,
            uri: string
        }
    ];
    transcode: { status: string };
    type: string;
    upload: {
        approach: string,
        complete_uri: string,
        form: string,
        link: string,
        redirect_url: string,
        size: number,
        status: string,
        upload_link: string
    };
    uri: string;
    user: [
        {
        account: string,
        available_for_hire: boolean,
        bio: string,
        can_work_remotely: boolean,
        clients: string,
        content_filter: [  ],
        created_time: Date,
        gender: string,
        link: string,
        location: string,
        location_details: [
            {
                city: string,
                country: string,
                country_iso_code: string,
                formatted_address: string,
                latitude: string,
                longitude: string,
                neighborhood: string,
                state: string,
                state_iso_code: string,
                sub_locality: string
            }
        ],
        metadata: {
            connections: {
                [key: string]: {
                    options: [ string ],
                    total: number,
                    uri: string
                }
            },
            interactions: {
                add_privacy_user: {
                    options: [ string ],
                    uri: string
                },
                block: {
                    added: boolean,
                    added_time: Date,
                    options: [ string ],
                    uri: string
                },
                connected_apps: {
                    all_scopes: [  ],
                    is_connected: boolean,
                    needed_scopes: [  ],
                    options: [ string ],
                    uri: string
                },
                follow: {
                    added: boolean,
                    options: [ string ],
                    uri: string
                },
                report: {
                    options: [ string ],
                    reason: [ string ],
                    uri: string
                }
            },
            public_videos: {
            total: number
            }
        },
        name: string,
        pictures: {
            active: boolean,
            default_picture: boolean,
            link: string,
            resource_key: string,
            sizes: [
                {
                    height: number,
                    link: string,
                    link_with_play_button: string,
                    width: number
                }
            ],
            type: string,
            uri: string
        },
        preferences: {
            videos: {
            privacy: {
                password: string
            }
            }
        },
        resource_key: string,
        short_bio: string,
        skills: [
            {
            name: string,
            uri: string
            }
        ],
        upload_quota: {
            lifetime: {
                free: number,
                max: number,
                used: number
            },
            periodic: {
                free: number,
                max: number,
                reset_date: Date,
                used: number
            },
            space: {
                free: number,
                max: number,
                showing: string,
                used: number
            }
        },
        uri: string,
        websites: [
            {
            description: string,
            link: string,
            name: string,
            type: string,
            uri: string
            }
        ]
        }
    ];
    vod: [];
    width: number;
}
