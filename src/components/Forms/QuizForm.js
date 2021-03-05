import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Input, InputLabel, MenuItem, NativeSelect, Radio } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import BootstrapInput from 'components/BootstrapInput/BootstrapInput';
import LocationAutocomplete from 'components/LocationAutocomplete/LocationAutocomplete';
import Autocomplete from 'components/Autocomplete/Autocomplete';
import { toBase64 } from 'helpers/uploadHelpers';
import { VideoLabel } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        overflow: 'hidden',
        position: 'relative',
        marginTop: '15px',
        '& > *': {
            margin: theme.spacing(1),
            // width: '25ch',
        },
        "& legend.MuiFormLabel-root": {
            marginBottom: '10px'
        },
    },
    FormControl: {
        marginTop: "30px"
    },
    permissions: {
        marginTop: '25px',
    },
    FormControlSizeHalf: {
        width: "47.5%",
    },
    questionContainer: {
        width: "65%",
    },
    nameInputWrapper: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    nameInputWrapperCol: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    actionsBar: {
        position: 'abosulte',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: '50px',
        marginBottom: '15px',

        "& button": {
            marginLeft: '20px'
        }

    },
    questionAnswers: {
        marginTop: '25px',
        display: 'flex',
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
        width: '65%',
    },
    answerContainer: {
        flex: '1 1 80%'
    },
    fileUploadZone: {
        height: '115px',
        minHeight: '115px',
        width: '22.5vw',
        marginTop: '15px',

        "& .MuiDropzoneArea-textContainer": {
            fontSize: '1.1em',

            "& .MuiDropzoneArea-icon": {
                width: '30px',
                height: '30px'
            }
        }
    },
    fileUploadZoneParagraph: {
        fontSize: '1.1em',
        marginTop: '10px',
        marginBottom: '10px'
    }
}));

const QuizForm = ({
    errors = {},
    mode = 'new',
    tab,
    googleApiKey,
    quiz,
    users,
    setFormMode,
    onSubmit,
    setErrors
}) => {
    const classes = useStyles();
    const [questions, setQuestions] = useState(formData?.questions || [{ text: '', answers: [{ text: '', correct: true }] }]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        subject: '',
        questions: [],
    });

    // get current user if not in store
    React.useEffect(() => {
        setFormData({ ...quiz })
        console.log(quiz, 'questions');

        if (quiz?.questions) {
            setQuestions(quiz.questions);
        }
    }, [quiz, tab]);

    const handleChange = (e) => {
        let val = e.target.value;
        const field = e.target.id;

        setFormData({
            ...formData,
            [field]: val
        });
    }

    const submitHandler = (data) => {
        onSubmit({...formData, questions});
    }

    const addNewQuestion = () => {
        setQuestions([...questions, { answers: [{ text: '', correct: true }], text: '' }])
    }

    const setQuestionValue = (e, q, i) => {
        const nq = { ...questions[i], text: e.target.value };
        setQuestions([...questions.slice(0, i), nq, ...questions.slice(i + 1)]);
    }

    const setQuestionAnswerValue = (e, i, j) => {
        const a = {...questions[i].answers[j], text: e.target.value}
        const na = [...questions[i].answers.slice(0, j), a, ...questions[i].answers.slice(j + 1)];
        const nq = { ...questions[i], answers: na };
        setQuestions([...questions.slice(0, i), nq, ...questions.slice(i + 1)]);
    }
 
    const handleCorrectChange = (e, q, i, a, j) => {
        const na = questions[i].answers.map(a => {
            a.correct = false;
            return a;
        });
        na[j].correct = true;

        const nq = { ...questions[i], answers: na };
        setQuestions([...questions.slice(0, i), nq, ...questions.slice(i + 1)]);
    }

    const addNewAnswerQuestion = (e, q, i, a, j) => {
        const nq = { ...questions[i], answers: [...questions[i].answers, { text: '', correct: false }] };
        setQuestions([...questions.slice(0, i), nq, ...questions.slice(i + 1)]);
    }


    return (
        <form className={classes.root} noValidate autoComplete="off">
            {errors["global"] && <Alert severity="error">{errors["global"]}</Alert>}
            <div className={classes.nameInputWrapper}>
                <FormControl error={errors["name"]} required className={classes.FormControlSizeHalf} >
                    <InputLabel htmlFor="name">Quiz name</InputLabel>
                    <Input id="name" value={formData.name} onChange={handleChange} />
                    {errors["name"] && <FormHelperText>{errors["name"]}</FormHelperText>}
                </FormControl>
                <FormControl error={errors["subject"]} required className={classes.FormControlSizeHalf}>
                    <InputLabel htmlFor="subject">Subject</InputLabel>
                    <Input id="subject" value={formData.subject} onChange={handleChange} />
                    {errors["subject"] && <FormHelperText>{errors["subject"]}</FormHelperText>}
                </FormControl>
            </div>
            <FormControl error={errors["description"]} fullWidth>
                <InputLabel htmlFor="description">Description</InputLabel>
                <Input id="description" value={formData.description} onChange={handleChange} />
                {errors["description"] && <FormHelperText>{errors["description"]}</FormHelperText>}
            </FormControl>
            {questions.map((q, i) =>
                <div style={{ marginTop: '40px' }}>
                    <FormControl error={errors[`question-${i}`]} required className={classes.questionContainer}>
                        <Input placeholder="Enter question" id={`question-${i}`} value={questions[i]?.text} onChange={(e) => setQuestionValue(e, q, i)} />
                        {errors[`question-${i}`] && <FormHelperText>{errors["description"]}</FormHelperText>}
                    </FormControl>
                    <div className={classes.questionAnswers}>
                        {q.answers?.map((a, j) =>
                            <div className={classes.answerContainer}>
                                <FormControl error={errors[`question-${i}-answer-${j}`]} required>
                                    <Input placeholder="Enter answer" id={`question-${i}-answer-${j}`} value={questions[i]?.answers[j]?.text} onChange={(e) => setQuestionAnswerValue(e, i, j)} />
                                    {errors[`question-${i}-answer-${j}`] && <FormHelperText>{errors["description"]}</FormHelperText>}
                                </FormControl>
                                <FormControl error={errors[`question-${i}-answer-${j}`]} required>
                                    <Radio
                                        size="small"
                                        checked={a.correct}
                                        onChange={(e) => handleCorrectChange(e, q, i, a, j)}
                                    />
                                </FormControl>
                            </div>
                        )}
                        <Button style={{ marginLeft: '25px' }} size='small' variant="contained" color="primary" onClick={(e) => addNewAnswerQuestion(e, q, i)}>
                            Add Answer
                        </Button>
                    </div>
                </div>
            )}
            <Button style={{ marginTop: '75px' }} variant="contained" color="primary" onClick={addNewQuestion}>
                Add Question
            </Button>
            <div className={classes.actionsBar}>
                <Button variant="contained" color="primary" onClick={() => submitHandler(formData)}>
                    {mode === 'new' ? 'Create' : 'Update'}
                </Button>
            </div>
        </form>
    );
}
export default QuizForm;