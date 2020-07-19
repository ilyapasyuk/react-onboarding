import React, { useState, useEffect } from 'react'

import {
    StyledCloseButton,
    StyledDescription,
    StyledFooter,
    StyledInfo,
    StyledLine,
    StyledPin,
    StyledStepButton,
    StyledStepsCount,
    StyledTitle,
    StyledWizard,
    StyledWrapper,
} from './style'

type Step = {
    elementId: string
    StyledTitle: string
    StyledDescription?: string
}

interface Props {
    isShow?: boolean
    rule: Step[]
    prevButtonStyledTitle?: string
    nextButtonStyledTitle?: string
}

type Coordinates = {
    top: number
    left: number
}

const Index = ({
    isShow = true,
    rule,
    prevButtonStyledTitle = 'Prev',
    nextButtonStyledTitle = 'Next',
}: Props) => {
    const [isShowState, setShow] = useState<boolean>(isShow)
    const [position, setPosition] = useState<Coordinates>({ top: 0, left: 0 })
    const [currentStepNumber, setCurrentStepNumber] = useState<number>(0)
    const currentStepContent = getStep(currentStepNumber, rule)

    useEffect(() => {
        setPosition(getCoords(getStep(currentStepNumber, rule).elementId))
    }, [rule])

    const onStepButtonClick = (stepNumber: number): void => {
        setCurrentStepNumber(stepNumber)
        setPosition(getCoords(getStep(stepNumber, rule).elementId))
    }

    if (!isShowState || !position) {
        return null
    }

    return (
        <StyledWrapper style={{ left: position.left, top: position.top }}>
            <StyledWizard>
                <StyledCloseButton onClick={() => setShow(false)}>X</StyledCloseButton>
                <StyledInfo>
                    <StyledStepsCount>
                        {currentStepNumber + 1} of {rule.length}
                    </StyledStepsCount>
                </StyledInfo>

                <StyledTitle
                    dangerouslySetInnerHTML={{ __html: currentStepContent.StyledTitle }}
                />
                <StyledDescription>
                    {currentStepContent.StyledDescription}
                </StyledDescription>

                <StyledFooter>
                    {currentStepNumber !== 0 && (
                        <StyledStepButton
                            onClick={() => onStepButtonClick(currentStepNumber - 1)}
                        >
                            {prevButtonStyledTitle}
                        </StyledStepButton>
                    )}

                    {currentStepNumber !== rule.length - 1 && (
                        <StyledStepButton
                            onClick={() => onStepButtonClick(currentStepNumber + 1)}
                            // disabled={currentStepNumber + 1 === rule.length}
                        >
                            {nextButtonStyledTitle}
                        </StyledStepButton>
                    )}
                </StyledFooter>
            </StyledWizard>
            <StyledPin />
            <StyledLine />
        </StyledWrapper>
    )
}

function getStep(stepNumber: number, rules: Step[]): Step {
    return rules[stepNumber]
}

function getCoords(elementId: string): Coordinates {
    const element = document.getElementById(elementId)
    const coordinates = element?.getBoundingClientRect()

    const top = (coordinates?.top || 0) + (coordinates?.height || 0) / 2
    const left = (coordinates?.left || 0) + (coordinates?.width || 0)

    return {
        top,
        left,
    }
}

export default Index
