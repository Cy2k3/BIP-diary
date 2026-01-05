"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useDiary } from "@/lib/diary-context"
import type { QuizQuestion } from "@/lib/diary-data"
import { Trophy, CheckCircle2, XCircle, HelpCircle, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface DayQuizProps {
  dayIndex: number
  quiz: QuizQuestion[]
  completed: boolean
}

export function DayQuiz({ dayIndex, quiz, completed }: DayQuizProps) {
  const { completeQuiz } = useDiary()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [quizStarted, setQuizStarted] = useState(false)
  const [answered, setAnswered] = useState(false)

  const question = quiz[currentQuestion]
  const isCorrect = selectedAnswer === question?.correctIndex
  const xpPerQuestion = 10

  const handleAnswer = (index: number) => {
    if (answered) return
    setSelectedAnswer(index)
    setAnswered(true)
    if (index === question.correctIndex) {
      setCorrectAnswers((prev) => prev + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(null)
      setAnswered(false)
    } else {
      setShowResult(true)
      const earnedXP = correctAnswers * xpPerQuestion
      completeQuiz(dayIndex, earnedXP)
    }
  }

  if (completed) {
    return (
      <Card className="border-accent/50 bg-accent/5">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Trophy className="w-4 h-4 text-accent" />
            Quiz Completed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <Sparkles className="w-10 h-10 mx-auto text-accent mb-2" />
            <p className="text-sm text-muted-foreground">You've already completed today's quiz!</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!quizStarted) {
    return (
      <Card className="sticky top-24">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-primary" />
            Daily Quiz
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Trophy className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Test Your Knowledge</p>
              <p className="text-sm text-muted-foreground mt-1">
                Answer {quiz.length} questions to earn up to {quiz.length * xpPerQuestion} XP
              </p>
            </div>
            <Button onClick={() => setQuizStarted(true)} className="w-full">
              Start Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (showResult) {
    const earnedXP = correctAnswers * xpPerQuestion
    return (
      <Card className="sticky top-24 border-accent/50">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Trophy className="w-4 h-4 text-accent" />
            Quiz Complete!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 space-y-4">
            <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
              <span className="text-3xl font-bold text-accent">+{earnedXP}</span>
            </div>
            <div>
              <p className="font-bold text-foreground text-lg">XP Earned!</p>
              <p className="text-sm text-muted-foreground">
                You got {correctAnswers} out of {quiz.length} correct
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="sticky top-24">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-primary" />
            Daily Quiz
          </CardTitle>
          <span className="text-xs text-muted-foreground">
            {currentQuestion + 1}/{quiz.length}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm font-medium text-foreground">{question.question}</p>

        <div className="space-y-2">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index
            const isCorrectOption = index === question.correctIndex

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={answered}
                className={cn(
                  "w-full text-left p-3 rounded-lg border-2 transition-all text-sm",
                  !answered && "hover:border-primary/50 hover:bg-primary/5",
                  answered && isCorrectOption && "border-accent bg-accent/10",
                  answered && isSelected && !isCorrectOption && "border-destructive bg-destructive/10",
                  !answered && "border-border",
                )}
              >
                <div className="flex items-center gap-2">
                  {answered && isCorrectOption && <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />}
                  {answered && isSelected && !isCorrectOption && (
                    <XCircle className="w-4 h-4 text-destructive shrink-0" />
                  )}
                  <span>{option}</span>
                </div>
              </button>
            )
          })}
        </div>

        {answered && (
          <div className="pt-2">
            <p className={cn("text-sm font-medium mb-3", isCorrect ? "text-accent" : "text-destructive")}>
              {isCorrect ? "Correct! +10 XP" : "Not quite right"}
            </p>
            <Button onClick={handleNext} className="w-full">
              {currentQuestion < quiz.length - 1 ? "Next Question" : "See Results"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
