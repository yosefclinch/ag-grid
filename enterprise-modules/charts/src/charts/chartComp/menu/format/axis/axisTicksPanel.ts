import {
    AgColorPicker,
    AgGroupComponent,
    AgGroupComponentParams,
    AgSlider,
    Autowired,
    Component,
    PostConstruct,
    RefSelector
} from "@ag-grid-community/core";
import { ChartTranslator } from "../../../chartTranslator";
import { ChartOptionsService } from "../../../chartOptionsService";
import { getMaxValue } from "../formatPanel";

export class AxisTicksPanel extends Component {

    public static TEMPLATE = /* html */
        `<div>
            <ag-group-component ref="axisTicksGroup">
                <ag-color-picker ref="axisTicksColorPicker"></ag-color-picker>
                <ag-slider ref="axisTicksWidthSlider"></ag-slider>
                <ag-slider ref="axisTicksSizeSlider"></ag-slider>
            </ag-group-component>
        </div>`;

    @RefSelector('axisTicksGroup') private axisTicksGroup: AgGroupComponent;
    @RefSelector('axisTicksColorPicker') private axisTicksColorPicker: AgColorPicker;
    @RefSelector('axisTicksWidthSlider') private axisTicksWidthSlider: AgSlider;
    @RefSelector('axisTicksSizeSlider') private axisTicksSizeSlider: AgSlider;

    @Autowired('chartTranslator') private chartTranslator: ChartTranslator;

    constructor(private readonly chartOptionsService: ChartOptionsService) {
        super();
    }

    @PostConstruct
    private init() {
        const groupParams: AgGroupComponentParams = {
            cssIdentifier: 'charts-format-sub-level',
            direction: 'vertical',
            suppressOpenCloseIcons: true
        };
        this.setTemplate(AxisTicksPanel.TEMPLATE, {axisTicksGroup: groupParams});
        this.initAxisTicks();
    }

    private initAxisTicks() {
        this.axisTicksGroup
            .setTitle(this.chartTranslator.translate("ticks"))
            .hideOpenCloseIcons(true)
            .hideEnabledCheckbox(true);

        this.axisTicksColorPicker
            .setLabel(this.chartTranslator.translate("color"))
            .setLabelWidth("flex")
            .setInputWidth(45)
            .setValue(this.chartOptionsService.getAxisProperty("tick.color"))
            .onValueChange(newColor => this.chartOptionsService.setAxisProperty("tick.color", newColor));

        const initInput = (expression: string, input: AgSlider, label: string, defaultMaxValue: number) => {
            const currentValue = this.chartOptionsService.getAxisProperty<number>(expression);
            input.setLabel(label)
                .setMaxValue(getMaxValue(currentValue, defaultMaxValue))
                .setValue(`${currentValue}`)
                .setTextFieldWidth(45)
                .onValueChange(newValue => this.chartOptionsService.setAxisProperty(expression, newValue));
        };

        initInput("tick.width", this.axisTicksWidthSlider, this.chartTranslator.translate("width"), 10);
        initInput("tick.size", this.axisTicksSizeSlider, this.chartTranslator.translate("length"), 30);
    }
}
