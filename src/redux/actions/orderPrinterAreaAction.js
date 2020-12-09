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


export const LABEL_PRITE_CLICKED = (formula, orderDate, gramsQty, dosagesQty, daysQty) => {
	let expiryDate = new Date(new Date().setFullYear(new Date(orderDate).getFullYear()+2)).toISOString().split("T")[0];

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
        <LineObject>
          <Name>ILineObject0</Name>
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
          <StrokeWidth>1</StrokeWidth>
          <DashPattern>SolidLine</DashPattern>
          <LineType>Horizontal</LineType>
          <ObjectLayout>
            <DYMOPoint>
              <X>0.2133333</X>
              <Y>0.9551329</Y>
            </DYMOPoint>
            <Size>
              <Width>3.681667</Width>
              <Height>1.013333</Height>
            </Size>
          </ObjectLayout>
        </LineObject>
        <LineObject>
          <Name>ILineObject1</Name>
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
          <StrokeWidth>1</StrokeWidth>
          <DashPattern>SolidLine</DashPattern>
          <LineType>Horizontal</LineType>
          <ObjectLayout>
            <DYMOPoint>
              <X>0.2133333</X>
              <Y>0.06</Y>
            </DYMOPoint>
            <Size>
              <Width>3.696667</Width>
              <Height>1.013333</Height>
            </Size>
          </ObjectLayout>
        </LineObject>
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
          <FitMode>AlwaysFit</FitMode>
          <IsVertical>False</IsVertical>
          <FormattedText>
            <FitMode>AlwaysFit</FitMode>
            <HorizontalAlignment>Left</HorizontalAlignment>
            <VerticalAlignment>Middle</VerticalAlignment>
            <IsVertical>False</IsVertical>
            <LineTextSpan>
              <TextSpan>
                <Text>Warning: please keep this in cool areas. Please follow the</Text>
                <FontInfo>
                  <FontName>Noto Sans CJK JP</FontName>
                  <FontSize>8.6</FontSize>
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
                <Text>medical professional instruction. Please contact your doctor and stop</Text>
                <FontInfo>
                  <FontName>Noto Sans CJK JP</FontName>
                  <FontSize>8.6</FontSize>
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
                <Text>taking the herbs if you feel uncomforable.</Text>
                <FontInfo>
                  <FontName>Noto Sans CJK JP</FontName>
                  <FontSize>8.6</FontSize>
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
              <X>0.2133333</X>
              <Y>1.461799</Y>
            </DYMOPoint>
            <Size>
              <Width>3.696667</Width>
              <Height>0.5479832</Height>
            </Size>
          </ObjectLayout>
        </TextObject>
        <TextObject>
          <Name>ITextObject1</Name>
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
          <HorizontalAlignment>Center</HorizontalAlignment>
          <VerticalAlignment>Middle</VerticalAlignment>
          <FitMode>AlwaysFit</FitMode>
          <IsVertical>False</IsVertical>
          <FormattedText>
            <FitMode>AlwaysFit</FitMode>
            <HorizontalAlignment>Center</HorizontalAlignment>
            <VerticalAlignment>Middle</VerticalAlignment>
            <IsVertical>False</IsVertical>
            <LineTextSpan>
              <TextSpan>
                <Text>Formula: ${formula}</Text>
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
                <Text>Expiry date: ${expiryDate}</Text>
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
                <Text>${gramsQty} gram(s) per dosage</Text>
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
                <Text>${dosagesQty} dosage(s) per day</Text>
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
                <Text>${daysQty} day(s) per session</Text>
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
              <X>0.2133333</X>
              <Y>0.07</Y>
            </DYMOPoint>
            <Size>
              <Width>3.696667</Width>
              <Height>1.330165</Height>
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

	dymo.print('DYMO LabelWriter 450 Turbo', labelXml);


}