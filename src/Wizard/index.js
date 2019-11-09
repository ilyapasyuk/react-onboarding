import React, { useState, useEffect } from 'react'

const styles = {
    wizard: {
        width: 226,
        minHeight: 100,
        backgroundColor: 'white',
        padding: 10,
        border: '1px solid #d9d9d9',
        boxShadow: '0 3px 8px 0 rgba(0,0,0,.15)',
        transform: 'translate(22px, -50px)',
        zIndex: 2,
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        top: 8,
        right: 10,
        padding: 0,
        cursor: 'pointer',
        color: 'grey',
        border: 0,
        outline: 'none',
        background: 'transparent',
    },
    footer: {
        padding: '10px 0 0',
        textAlign: 'right',
    },
    title: {
        marginBottom: 8,
        letterSpacing: 'normal',
        color: '#000000',
        fontSize: 14,
        fontWeight: 600,
        fontStyle: 'normal',
    },
    description: {
        marginBottom: 15,
        color: '#4d4d4d',
        fontSize: 12,
        lineHeight: 1.25,
    },
    info: {
        display: 'flex',
        width: '87%',
        marginBottom: 10,
        alignItems: 'center',
    },
    stepsCount: {
        width: '35%',
        fontSize: 12,
    },
    pin: {
        position: 'absolute',
        zIndex: 2,
        width: 15,
        height: 15,
        borderRadius: 50,
        background: '#1787fc',
        boxShadow: '0 0 0 2px white',
        top: '-7px',
        left: '-7px',
    },
    pinLine: {
        height: 1,
        width: 25,
        top: 1,
        position: 'absolute',
        zIndex: 1,
        background: '#1787fc',
    },
    button: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 300,
        cursor: 'pointer',
        height: 32,
        lineHeight: '32px',
        padding: '0 16px',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        border: 0,
        borderRadius: 3,
        outline: 'none',
        backgroundColor: '#0084ff',
        color: '#fff',
        fontSize: 14,
        marginLeft: 10,
    },
}

const defaultPrevButtonTitle = 'Prev'
const defaultNextButtonTitle = 'Next'

const Wizard = ({
    isShow,
    rule,
    defaultStepNumber = 0,
    prevButtonTitle = defaultPrevButtonTitle,
    nextButtonTitle = defaultNextButtonTitle,
}) => {
    const [isShowState, setShow] = useState(isShow)
    const [transition, setTransition] = useState(null)
    const [position, setPosition] = useState(undefined)
    const [currentStepNumber, setCurrentStepNumber] = useState(defaultStepNumber)
    const currentStepContent = getStep(currentStepNumber, rule)

    const wrapperStyle = {
        position: 'absolute',
        zIndex: 99,
        transition: transition,
        ...position,
    }

    useEffect(() => {
        setPosition(getCoords(getStep(currentStepNumber, rule).elementId))
    }, [])

    function onStepButtonClick(stepNumber) {
        setCurrentStepNumber(stepNumber)
        setPosition(getCoords(getStep(stepNumber, rule).elementId))
        setTransition('all 100ms ease')
    }

    if (!isShowState || !position) {
        return null
    }

    return (
        <div style={wrapperStyle}>
            <div style={styles.wizard}>
                <button onClick={() => setShow(false)} style={styles.closeButton}>
                    X
                </button>
                <div style={styles.info}>
                    <div style={styles.stepsCount}>
                        {currentStepNumber + 1} of {rule.length}
                    </div>
                </div>

                <div
                    dangerouslySetInnerHTML={{ __html: currentStepContent.title }}
                    style={styles.title}
                />
                <div
                    dangerouslySetInnerHTML={{
                        __html: currentStepContent.description,
                    }}
                    style={styles.description}
                />

                <div style={styles.footer}>
                    {currentStepNumber !== 0 && (
                        <button
                            onClick={() => onStepButtonClick(currentStepNumber - 1)}
                            style={styles.button}
                        >
                            {prevButtonTitle}
                        </button>
                    )}

                    <button
                        onClick={() => onStepButtonClick(currentStepNumber + 1)}
                        disabled={currentStepNumber + 1 === rule.length}
                        style={styles.button}
                    >
                        {nextButtonTitle}
                    </button>
                </div>
            </div>
            <div style={styles.pin} />
            <div style={styles.pinLine} />
        </div>
    )
}

function getStep(stepNumber, rules) {
    return rules[stepNumber]
}

function getCoords(elementId) {
    const element = document.getElementById(elementId)
    const coordinates = element.getBoundingClientRect()

    return {
        top: coordinates.top + coordinates.height / 2,
        left: coordinates.left + coordinates.width,
    }
}

export default Wizard
