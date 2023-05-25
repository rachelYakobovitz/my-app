import React, { Component, ReactNode } from "react";
import System from "./system";
import ISystem from "../model/system";
import { log } from "console";
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { CacheProvider } from "@emotion/react";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";


interface IProps {

}
interface IState {
    systems: ISystem[];
    xPosition: number;
    Istart: number;
    Iend: number;
}
class SystemList extends Component<IProps, IState>{
    constructor(props: any) {
        super(props)

        let SystemArr: ISystem[] = [];
        this.state = {
            systems: SystemArr,
            xPosition: 0,
            Istart: 0,
            Iend: 3,
        }

    }
    //Initialization of the system list:
    SystemList: ISystem[] = [
        {
            id: 1,
            name: "iTunes",
            description: "iTunes הוא הדרך הפשוטה ביותר ליהנות מכל אמצעי הבידור שצריך – מוסיקה, סרטים ותכניות טלוויזיה – ולמצוא אותם בצורה מסודרת ונגישה. ניתן לשכור או לקנות סרטים, להוריד את תכניות הטלוויזיה המועדפות עליך, ועוד",
            image: '../../image/iTunes.png',
            link: "https://apps.microsoft.com/store/detail/itunes/9PB2MZ1ZMB1S?hl=he-il&gl=il"
        },
        {
            id: 2,
            name: "WhatsApp",
            description: "WhatsApp from Meta היא אפליקציה חינמית לשליחה ולקבלה של הודעות. משתמשים בה יותר מ-2 מיליארד אנשים, ביותר מ-180 מדינות. היא קלה לשימוש, אמינה ופרטית, כך שתוכלו לשמור על קשר עם החברים והמשפחה בקלות. ",
            image: '../../image/apl.png',
            link: "https://apps.microsoft.com/store/detail/whatsapp/9NKSQGP7F2NH?hl=he-il&gl=il"
        },
        {
            id: 3,
            name: "iCloud ",
            description: "עם iCloud עבור Windows באפשרותך לדעת שהתמונות, הסרטים, הודעות הדואר, לוח השנה וכל מידע חשוב אחר שאחסנת יהיה תמיד מעודכן וזמין עבורך במחשב ה‏-‏Windows PC שלך.",
            image: '../../image/iCloud.png',
            link: "https://apps.microsoft.com/store/detail/icloud/9PKTQ5699M62?hl=he-il&gl=il"
        },
        {
            id: 4,
            name: "Facebook ",
            description: "The Facebook app helps you connect with friends, family and communities of people who share your interests. Connecting with your friends and family, as well as discovering new ones, is easy with features such as Groups, Watch and Marketplace.",
            image: '../../image/facebook.png',
            link: "https://apps.microsoft.com/store/detail/facebook/9WZDNCRFJ2WL?hl=he-il&gl=il"
        },
        {
            id: 5,
            name: " Power BI ",
            description: "Power BI Desktop puts visual analytics at your fingertips. With this powerful authoring tool, you can create interactive data visualizations and reports.",
            image: '../../image/bi.png',
            link: "https://apps.microsoft.com/store/detail/power-bi-desktop/9NTXR16HNW1T?hl=he-il&gl=il"
        },
        {
            id: 6,
            name: " Gmail ",
            description: "Connect easily and super fast to your Gmail, Outlook, Yahoo or other email accounts!",
            image: '../../image/mail.png',
            link: "https://apps.microsoft.com/store/detail/mail/9WZDNCRFJ41Q?hl=he-il&gl=il"
        },
        {
            id: 7,
            name: " Picsart Photo Editor ",
            description: "Get Picsart and join a global community of over 150 million creators. With the Picsart Photo Editor, you can bring your unique creative vision to life. Access ready-to-use, professional-level templates, grid collages, popular filters, and effects to create outstanding content. Design your own stickers, quickly remove or change backgrounds, customize and save assets, or get inspired by our creator community",
            image: '../../image/photo.png',
            link: "https://apps.microsoft.com/store/detail/picsart-photo-editor/9WZDNCRFJ10M?hl=he-il&gl=il"
        },
        {
            id: 8,
            name: "Netflix ",
            description: "Netflix is the world’s leading subscription service for watching TV episodes and movies.Get the free app as a part of your Netflix membership and you can instantly watch thousands of TV episodes & movies",
            image: '../../image/netflix.png',
            link: "https://apps.microsoft.com/store/detail/netflix/9WZDNCRFJ3TJ?hl=he-il&gl=il"
        }
    ]

    //פונקציה הזזה של הרכיבים שמאלה
    ScrolllLeft() {
        if (this.state.Istart > 0) {
            this.setState({ Istart: this.state.Istart - 1 });
            this.setState({ Iend: this.state.Iend - 1 })
        }
    }
    //פונקציה הזזה של הרכיבים ימינה
    ScrollRight() {
        if (this.state.Iend < 7) {
            this.setState({ Istart: this.state.Istart + 1 });
            this.setState({ Iend: this.state.Iend + 1 })
        }
    }

    //Entry of the list of systems into sessionStorage:
    componentDidMount(): void {
        console.log(this.SystemList)
        this.setState({ systems: this.SystemList })
        console.log(this.state.systems);
        sessionStorage.setItem("SystemList", JSON.stringify(this.SystemList));
    }


    render() {
        return (
            <div style={{ justifyContent: "center", display: "flex", border: "solid 3px", flexDirection: "row", marginLeft: "200px", marginRight: "200px", marginTop: "250px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {this.state.Istart > 0 ?
                        <ArrowBackIos style={{ left: 150, position: "fixed", zIndex: 100 }} onClick={() => this.ScrolllLeft()} />
                        : <></>}
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} >

                        {this.SystemList?.map((e: ISystem, index: number) =>
                            <System key={index} index={index} Iend={this.state.Iend} Istart={this.state.Istart} system={e} ></System>
                        )}
                    </Box>
                    {this.state.Iend < 7 ?
                        <ArrowForwardIos style={{ right: 150, position: "fixed", zIndex: 100 }} onClick={() => this.ScrollRight()} />
                        : <></>}
                </div>
            </div>
        );
    }
}
export default SystemList;



