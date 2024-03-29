import React, { useState, useEffect } from 'react'
import { Typography, Button, Switch, Backdrop } from '@mui/material'

import TestGraph from './../components/TestGraph'
import {problemSet} from './../utils/problems'
import AnswerChoices from '../components/AnswerChoices/AnswerChoices'
import TestSettings from '../components/TestSettings'
import identifyAngles from '../utils/identifyAngles'

// import { getAuth } from 'firebase/auth' // keep this for rerouting?

// IDEAS:
//  - create a settings screen for users to adjust what problem they want to work on
//  - Make the next problem function into a doubly linked list so users can go back to review answers
//  - Make sure the same question doesn't get repeated
//  - add footer and make App.js styling to Maxwidth: 100vw and maxHeight: 100vh


const TestScreen = () => {
    // const [reload, setReload] = useState(0) // this line is only to reload the page on auth change
    const [streak, setStreak] = useState(0)
    const [problem, setProblem] = useState({})
    const [oldProblem, setOldProblem] = useState({})
    const [finalAnswerChoice, setFinalAnswerChoice] = useState('')
    const [correct, setCorrect] = useState(null)
    const [references, setReferences] = useState(false)
    const [settings, setSettings ] = useState(false)
    const [filteredOutTypes, setFilteredOutTypes] = useState({sin: false, cos: false, tan: false})
    const [filteredOutQuadrants, setFilteredOutQuadrants] = useState({q1: false, q2: false, q3: false, q4: false})
    const [radians, setRadians] = useState(true)

    // make function to change streak and pass to answer choices
    
    // implement auth and redirect
    // set state for type of problem

    const handleGotProblemCorrect = () => {
        setStreak(streak => streak + 1)
        // set streak
        // check if user is logged in
        // if user is logged in, then:
        // add correct question to database and update profile

        // for adding info to database
        // switch(problem.type) {
        //     case 'sin':
        // }

        // setStreak(streak[problem.type]++)

        // if (user is authenticated) {
        //     add problem to database
        // }
    }
    const handleGotProblemWrong = () => {
        setStreak(0)
    }

    const getProblem = () => {
        setOldProblem(problem) // this sets the old problem to the current problem
        // console.log(`Old Problem: `)
        // console.log(oldProblem)

        let random = problemSet[Math.floor(Math.random() * problemSet.length)];
        // verified = verifyproblem()
        // while !verified:
        //      choose new problem
        //      re verify 
        let verified = verifyProblem(random)
        while (!verified) {
            random = problemSet[Math.floor(Math.random() * problemSet.length)];
            verified = verifyProblem(random)
        }

        // console.log(`New Problem: `)
        // console.log(problem)
        setProblem(random)

        // setting correct answer to null
        setCorrect(null)
        // setReferences(false) // turns off references after every problem
        return;
    }

    const verifyProblem = (random) =>{
        const type = random.type;
        const quadrant = random.quadrant;

        // if (type == 'sin') {
        //     return true
        // } else {
        //     return false
        // }

        // if there are any type preferences
        if (filteredOutTypes.sin || filteredOutTypes.cos || filteredOutTypes.tan) {
            if (filteredOutTypes.sin) {
                if (type == 'sin') return false
            }
            if (filteredOutTypes.cos) {
                if (type == 'cos') return false
            }
            if (filteredOutTypes.tan) {
                if (type == 'tan') return false
            }
        }

        if (filteredOutQuadrants.q1 || filteredOutQuadrants.q2 || filteredOutQuadrants.q3 || filteredOutQuadrants.q4) {
            if (filteredOutQuadrants.q1) {
                if (quadrant == '1') return false 
            }
            if (filteredOutQuadrants.q2) {
                if (quadrant == '2') return false 
            }
            if (filteredOutQuadrants.q3) {
                if (quadrant == '3') return false 
            }
            if (filteredOutQuadrants.q4) {
                if (quadrant == '4') return false 
            }
        }

        if (oldProblem.name == random.name) { // if new problem is the same as the old problem
            return false
        }

        return true
    }

    useEffect(() => {
        if (!problem.name) {
            getProblem()
            console.log(problem.type)
            console.log(typeof problem.degree)
            console.log(identifyAngles('0'))
            // console.log(auth)
        }
        // setReload(num => num + 1) // forcing re render -- very broken .causes thousands oferrors
        
    })

    return (

        <div style={{display: 'flex', maxHeight: '80vh', maxWidth: '100vw', overflowY: 'hidden', overflowX: 'hidden', margin: '2em 0 2em 2em' }}>
            {/* graph/problem section (left) */}
            <div style={{width: '45%', padding: '1rem' }}>
                <div className="container"> 

                    <div>

                        {/* Can make streak simpler. For every question right, add a flame */}
                        {/* {
                            streak >= 2 &&
                            <Typography variant="h4">{streak} in a row 🔥🔥.</Typography> 
                        } */}
                    </div> 
                    <div style={{display: 'flex'}}>
                        <Button variant="text" onClick={() => setSettings(true)}>
                            Settings
                        </Button>
                        <Backdrop   
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={settings}
                             
                        >
                            <TestSettings references={references} setReferences={setReferences} setSettings={setSettings} filteredOutTypes={filteredOutTypes} setFilteredOutTypes={setFilteredOutTypes} filteredOutQuadrants={filteredOutQuadrants} setFilteredOutQuadrants={setFilteredOutQuadrants} radians={radians} setRadians={setRadians}/>
                        </Backdrop>
                        <Button variant="contained" onClick={getProblem} color={correct ? 'success' : (correct === false) ? 'error' : 'primary'} >Next Question</Button> 
                        {/* <div>

{
    (correct == true || correct == false)
    &&
    <Typography variant="h5" style={{marginLeft: '1em'}}>Answer: {problem.answer}</Typography>   
}  
</div> */}
                        
                    </div>
                    {
                        !radians &&
                        <Typography variant="h2">What is {problem.type}({problem.degree})?</Typography> 

                    }
                    {
                        radians &&
                        <div>
                            <Typography variant="h2">What is {problem.type}({identifyAngles(problem.degree)})?</Typography> 
                        </div>
                    }
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <TestGraph stoppingDegree={problem.degree} references={references} /> 
                    </div>
                </div>
            </div>

            {/* This is the right side of the screen with the answer buttons */}
            <div style={{width: '45%', marginRight: '6em' }}>
                <AnswerChoices getNewProblem={getProblem} setAnswerChoice={setFinalAnswerChoice} answerChoice={finalAnswerChoice} correctAnswer={problem.answer} onCorrect={handleGotProblemCorrect} onWrong={handleGotProblemWrong} setCorrect={setCorrect}  correct={correct} />
            </div>
            
        </div>
    )
}

// to see legacy Answer Buttons code check ../legacy/LegacyAnswerButtons.js



export default TestScreen;