import {ADD_CLASS, REMOVE_CLASS} from './helperFunctions';
const Dymo = require('dymojs'),
dymo = new Dymo();
let orderPrinter = {
	displayRawGram: true,
	displayExtractGram: true,
	displayTotalGram: true,
	displayUnitPrice: true
}


export const RESET_PRINTING_TOGGLE_DEFAULT = () => {
	return dispatch => {
		dispatch({
			type: "resetPrintingToggleDefault"
		})
	}
}


export const UPDATE_PRINTING_TOGGLE = (printingType,targetAttribute, e) => {
	 orderPrinter[targetAttribute] = e.target.checked;
	
	let marginLeftForPrinting = (orderPrinter.displayRawGram? 0:1) + (orderPrinter.displayExtractGram? 0:1) + (orderPrinter.displayTotalGram? 0:1) + (orderPrinter.displayUnitPrice? 0:1);
	
	let target = printingType === "orderEditing"? document.querySelector(".orderEditing-wrapper .order-body"):document.querySelector(".orderReview-wrapper .order-body");
	console.log(printingType);
	REMOVE_CLASS(target, "marginLeftForPrinting-2");
	REMOVE_CLASS(target, "marginLeftForPrinting-4");
	REMOVE_CLASS(target, "marginLeftForPrinting-6");
	REMOVE_CLASS(target, "marginLeftForPrinting-8");

	switch (marginLeftForPrinting) {
		case 1:
			ADD_CLASS(target, "marginLeftForPrinting-2");
			break;
		case 2:
			ADD_CLASS(target, "marginLeftForPrinting-4");
			break;
		case 3:
			ADD_CLASS(target, "marginLeftForPrinting-6");
			break;
		case 4:
			ADD_CLASS(target, "marginLeftForPrinting-8");
			break;
	}	
	
	return dispatch => {
		dispatch({
			type: "updateOrderPrinter", 
			payload: { orderPrinter: orderPrinter}	
		})
	}
}


export const LABEL_PRITE_CLICKED = () => {
	
	let labelXml = `<?xml version="1.0" encoding="utf-8"?>
<DesktopLabel Version="1">
  <DYMOLabel Version="3">
    <Description>DYMO Label</Description>
    <Orientation>Landscape</Orientation>
    <LabelName>Shipping30573</LabelName>
    <InitialLength>0</InitialLength>
    <BorderStyle>SolidLine</BorderStyle>
    <DYMORect>
      <DYMOPoint>
        <X>0.2133333</X>
        <Y>0.06</Y>
      </DYMOPoint>
      <Size>
        <Width>3.696667</Width>
        <Height>2.026666</Height>
      </Size>
    </DYMORect>
    <BorderColor>
      <SolidColorBrush>
        <Color A="1" R="0" G="0" B="0"></Color>
      </SolidColorBrush>
    </BorderColor>
    <BorderThickness>1</BorderThickness>
    <Show_Border>False</Show_Border>
    <DynamicLayoutManager>
      <RotationBehavior>ClearObjects</RotationBehavior>
      <LabelObjects>
        <TextObject>
          <Name>ITextObject0</Name>
          <Brushes>
            <BackgroundBrush>
              <SolidColorBrush>
                <Color A="0" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </BackgroundBrush>
            <BorderBrush>
              <SolidColorBrush>
                <Color A="1" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </BorderBrush>
            <StrokeBrush>
              <SolidColorBrush>
                <Color A="1" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </StrokeBrush>
            <FillBrush>
              <SolidColorBrush>
                <Color A="0" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </FillBrush>
          </Brushes>
          <Rotation>Rotation0</Rotation>
          <OutlineThickness>1</OutlineThickness>
          <IsOutlined>False</IsOutlined>
          <BorderStyle>SolidLine</BorderStyle>
          <Margin>
            <DYMOThickness Left="0" Top="0" Right="0" Bottom="0" />
          </Margin>
          <HorizontalAlignment>Left</HorizontalAlignment>
          <VerticalAlignment>Middle</VerticalAlignment>
          <FitMode>None</FitMode>
          <IsVertical>False</IsVertical>
          <FormattedText>
            <FitMode>None</FitMode>
            <HorizontalAlignment>Left</HorizontalAlignment>
            <VerticalAlignment>Middle</VerticalAlignment>
            <IsVertical>False</IsVertical>
            <LineTextSpan>
              <TextSpan>
                <Text>Formula: 蒼耳散</Text>
                <FontInfo>
                  <FontName>Noto Sans CJK JP</FontName>
                  <FontSize>10</FontSize>
                  <IsBold>False</IsBold>
                  <IsItalic>False</IsItalic>
                  <IsUnderline>False</IsUnderline>
                  <FontBrush>
                    <SolidColorBrush>
                      <Color A="1" R="0" G="0" B="0"></Color>
                    </SolidColorBrush>
                  </FontBrush>
                </FontInfo>
              </TextSpan>
            </LineTextSpan>
            <LineTextSpan>
              <TextSpan>
                <Text>Instruction:</Text>
                <FontInfo>
                  <FontName>Noto Sans CJK JP</FontName>
                  <FontSize>10</FontSize>
                  <IsBold>False</IsBold>
                  <IsItalic>False</IsItalic>
                  <IsUnderline>False</IsUnderline>
                  <FontBrush>
                    <SolidColorBrush>
                      <Color A="1" R="0" G="0" B="0"></Color>
                    </SolidColorBrush>
                  </FontBrush>
                </FontInfo>
              </TextSpan>
            </LineTextSpan>
            <LineTextSpan>
              <TextSpan>
                <Text>2 dosages per day / 5 days per session</Text>
                <FontInfo>
                  <FontName>Noto Sans CJK JP</FontName>
                  <FontSize>10</FontSize>
                  <IsBold>False</IsBold>
                  <IsItalic>False</IsItalic>
                  <IsUnderline>False</IsUnderline>
                  <FontBrush>
                    <SolidColorBrush>
                      <Color A="1" R="0" G="0" B="0"></Color>
                    </SolidColorBrush>
                  </FontBrush>
                </FontInfo>
              </TextSpan>
            </LineTextSpan>
            <LineTextSpan>
              <TextSpan>
                <Text />
                <FontInfo>
                  <FontName>Noto Sans CJK JP</FontName>
                  <FontSize>10</FontSize>
                  <IsBold>False</IsBold>
                  <IsItalic>False</IsItalic>
                  <IsUnderline>False</IsUnderline>
                  <FontBrush>
                    <SolidColorBrush>
                      <Color A="1" R="0" G="0" B="0"></Color>
                    </SolidColorBrush>
                  </FontBrush>
                </FontInfo>
              </TextSpan>
            </LineTextSpan>
            <LineTextSpan>
              <TextSpan>
                <Text>Expiry date: 2022-12-08</Text>
                <FontInfo>
                  <FontName>Noto Sans CJK JP</FontName>
                  <FontSize>10</FontSize>
                  <IsBold>False</IsBold>
                  <IsItalic>False</IsItalic>
                  <IsUnderline>False</IsUnderline>
                  <FontBrush>
                    <SolidColorBrush>
                      <Color A="1" R="0" G="0" B="0"></Color>
                    </SolidColorBrush>
                  </FontBrush>
                </FontInfo>
              </TextSpan>
            </LineTextSpan>
            <LineTextSpan>
              <TextSpan>
                <Text>Warning: please keep this in the cool area. </Text>
                <FontInfo>
                  <FontName>Noto Sans CJK JP</FontName>
                  <FontSize>10</FontSize>
                  <IsBold>False</IsBold>
                  <IsItalic>False</IsItalic>
                  <IsUnderline>False</IsUnderline>
                  <FontBrush>
                    <SolidColorBrush>
                      <Color A="1" R="0" G="0" B="0"></Color>
                    </SolidColorBrush>
                  </FontBrush>
                </FontInfo>
              </TextSpan>
            </LineTextSpan>
            <LineTextSpan>
              <TextSpan>
                <Text>Please follow the doctor's instruction. </Text>
                <FontInfo>
                  <FontName>Noto Sans CJK JP</FontName>
                  <FontSize>10</FontSize>
                  <IsBold>False</IsBold>
                  <IsItalic>False</IsItalic>
                  <IsUnderline>False</IsUnderline>
                  <FontBrush>
                    <SolidColorBrush>
                      <Color A="1" R="0" G="0" B="0"></Color>
                    </SolidColorBrush>
                  </FontBrush>
                </FontInfo>
              </TextSpan>
            </LineTextSpan>
            <LineTextSpan>
              <TextSpan>
                <Text>Please conact your doctor and stop taking the herbs if</Text>
                <FontInfo>
                  <FontName>Noto Sans CJK JP</FontName>
                  <FontSize>10</FontSize>
                  <IsBold>False</IsBold>
                  <IsItalic>False</IsItalic>
                  <IsUnderline>False</IsUnderline>
                  <FontBrush>
                    <SolidColorBrush>
                      <Color A="1" R="0" G="0" B="0"></Color>
                    </SolidColorBrush>
                  </FontBrush>
                </FontInfo>
              </TextSpan>
            </LineTextSpan>
            <LineTextSpan>
              <TextSpan>
                <Text>you have any unwellness.</Text>
                <FontInfo>
                  <FontName>Noto Sans CJK JP</FontName>
                  <FontSize>10</FontSize>
                  <IsBold>False</IsBold>
                  <IsItalic>False</IsItalic>
                  <IsUnderline>False</IsUnderline>
                  <FontBrush>
                    <SolidColorBrush>
                      <Color A="1" R="0" G="0" B="0"></Color>
                    </SolidColorBrush>
                  </FontBrush>
                </FontInfo>
              </TextSpan>
            </LineTextSpan>
          </FormattedText>
          <ObjectLayout>
            <DYMOPoint>
              <X>0.223767</X>
              <Y>0.1251654</Y>
            </DYMOPoint>
            <Size>
              <Width>3.521599</Width>
              <Height>1.88462</Height>
            </Size>
          </ObjectLayout>
        </TextObject>
      </LabelObjects>
    </DynamicLayoutManager>
  </DYMOLabel>
  <LabelApplication>Blank</LabelApplication>
  <DataTable>
    <Columns></Columns>
    <Rows></Rows>
  </DataTable>
</DesktopLabel>`;

	dymo.print('DYMO LabelWriter 450 Turbo', labelXml)
	.then(data => {console.log(data)});



	// <StyledText>
	//         <Element>
	//           <String>Formula:
	//           </String>
	//           <Attributes>
	//             <Font Family="Helvetica" Size="13" 
	//                 Bold="False" Italic="False" Underline="False" Strikeout="False"/>
	//             <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
	//           </Attributes>
	//         </Element>
	//         <Element>
	//           <String>Expiry Date:
	//           </String>
	//           <Attributes>
	//             <Font Family="Helvetica" Size="13" 
	//                 Bold="False" Italic="False" Underline="False" Strikeout="False"/>
	//             <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
	//           </Attributes>
	//         </Element>
	//         <Element>
	//           <String>Instruction: 
	//           </String>
	//           <Attributes>
	//             <Font Family="Helvetica" Size="13" 
	//                 Bold="False" Italic="False" Underline="False" Strikeout="False"/>
	//             <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
	//           </Attributes>
	//         </Element>
	//         <Element>
	//           <String>6 grams per dosage / 2 dosages per day / 5 days per session
	//           </String>
	//           <Attributes>
	//             <Font Family="Helvetica" Size="13" 
	//                 Bold="False" Italic="False" Underline="False" Strikeout="False"/>
	//             <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
	//           </Attributes>
	//         </Element>
	//         <Element>
	//           <String>Warning: Please keep this in cool areas.
	//           </String>
	//           <Attributes>
	//             <Font Family="Helvetica" Size="13" 
	//                 Bold="False" Italic="False" Underline="False" Strikeout="False"/>
	//             <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
	//           </Attributes>
	//         </Element>
	//         <Element>
	//          <String>Please follow the medical professional instruction.
	//           </String>
	//           <Attributes>
	//             <Font Family="Helvetica" Size="13" 
	//                 Bold="False" Italic="False" Underline="False" Strikeout="False"/>
	//             <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
	//           </Attributes>
	//         </Element>
	//         <Element>
	//            <String>Please contact your doctor and stop taking the herbs if you feel uncomfortable. 
	//           </String>
	//           <Attributes>
	//             <Font Family="Helvetica" Size="13" 
	//                 Bold="False" Italic="False" Underline="False" Strikeout="False"/>
	//             <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
	//           </Attributes>
	//         </Element>
 //       </StyledText>
}