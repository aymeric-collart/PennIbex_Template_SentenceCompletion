PennController.ResetPrefix(null);                               //shorten command names (keep this line here)
//PennController.DebugOff()

//// Set the order of the whole experiment ////
Sequence("intro", randomize("completion"), "send", "bye");


//// Welcome page ////
PennController("intro",
    newHtml("intro", "Introduction.html")
        .log()
        .print()
    ,
    newText("startText", "<p><h2>Click on the button to begin the experiment</h2></p>")
        .center()
        .print()
    ,
    newButton("start", "<big><b>Start</b></big>")
//        .settings.before(getText("startText"))
        .size(200, 50)
        .center()
        .cssContainer("vertical-align", "middle")
        .print()
        .wait(getHtml("intro")
            .test.complete()
                .failure(getHtml("intro")
                    .warn()))
);


//// The experiment itself ////
Template("ExpSentences.csv", row => 
        newTrial("completion",
                newTimer(250)
                    .start()
                    .wait()
                ,
                newText("Sentence", row.Sentence)
                    .print()
                ,
                newTextInput("answer")
                    .settings.before(getText("Sentence"))
                    .log("validate")
                    .lines(1)
                    .print()
                    .wait(getTextInput("answer").testNot.text("") )
                )
                .log("Sentence", row.Sentence)                  //add these three columns to the results lines of these Template-based trials
                .log("Condition", row.Condition)
                .log("Item Number", row.ItemNumber)
//                .log("ID", getVar("ID"))
        );
SendResults("send");
    
//// Last screen (after the experiment is done) ////
newTrial("bye"
    ,
    newText("Thank you for your participation!")
        .print()
    ,
    newButton()
        .wait()                                                 // Wait for a click on a non-displayed button = wait here forever
)
.setOption("countsForProgressBar", false );
// Make sure the progress bar is full upon reaching this last (non-)trial
