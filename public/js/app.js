const dropdownConfigurations = [

    {
        elementId: "environment",
        file: "/data/environments.json",
        label: "Select environment"
    },

    {
        elementId: "os",
        file: "/data/operating-systems.json",
        label: "Select operating system"
    },

    {
        elementId: "browser",
        file: "/data/browsers.json",
        label: "Select browser/device"
    },

    {
        elementId: "userRole",
        file: "/data/user-roles.json",
        label: "Select user role"
    },

    {
        elementId: "severity",
        file: "/data/severities.json",
        label: "Select severity"
    },

    {
        elementId: "priority",
        file: "/data/priorities.json",
        label: "Select priority"
    },

    {
        elementId: "reproducibility",
        file: "/data/reproducibility.json",
        label: "Select reproducibility"
    }

];


async function loadDropdown(config) {

    const select =
        document.getElementById(
            config.elementId
        );


    try {

        const response =
            await fetch(config.file);


        if (!response.ok) {

            throw new Error(
                `Failed to load ${config.file}`
            );

        }


        const values =
            await response.json();


        if (!Array.isArray(values)) {

            throw new Error(
                `${config.file} must contain a JSON array`
            );

        }

        select.innerHTML = "";

        const defaultOption =
            document.createElement("option");

        defaultOption.value = "";

        defaultOption.textContent =
            config.label;

        select.appendChild(
            defaultOption
        );


        values.forEach(value => {

            const option =
                document.createElement("option");

            option.value = value;

            option.textContent = value;

            select.appendChild(
                option
            );

        });


    } catch (error) {

        console.error(error);


        select.innerHTML = "";

        const option =
            document.createElement("option");

        option.value = "";

        option.textContent =
            "Unable to load options";

        select.appendChild(
            option
        );
    }
}


async function loadAllDropdowns() {

    await Promise.all(
        dropdownConfigurations.map(
            loadDropdown
        )
    );

}


function getValue(id) {

    const element =
        document.getElementById(id);


    if (!element) {
        return "NA";
    }


    const value =
        element.value.trim();


    return value === ""
        ? "NA"
        : value;
}



function getUAEDateTime() {

    const now =
        new Date();


    const formatter =
        new Intl.DateTimeFormat(
            "en-GB",
            {
                timeZone: "Asia/Dubai",

                year: "numeric",

                month: "2-digit",

                day: "2-digit",

                hour: "2-digit",

                minute: "2-digit",

                second: "2-digit",

                hour12: false
            }
        );


    const parts =
        formatter.formatToParts(now);


    const values = {};


    parts.forEach(part => {

        if (
            part.type !== "literal"
        ) {

            values[part.type] =
                part.value;

        }

    });


    return (
        `${values.year}-${values.month}-${values.day} ` +
        `${values.hour}:${values.minute}:${values.second}`
    );
}



function generateReport() {

    const timestamp =
        getUAEDateTime();


    const title =
        getValue("title");

    const description =
        getValue("description");

    const environment =
        getValue("environment");

    const version =
        getValue("version");

    const os =
        getValue("os");

    const browser =
        getValue("browser");

    const userRole =
        getValue("userRole");

    const preconditions =
        getValue("preconditions");

    const steps =
        getValue("steps");

    const expected =
        getValue("expected");

    const actual =
        getValue("actual");

    const severity =
        getValue("severity");

    const priority =
        getValue("priority");

    const reproducibility =
        getValue("reproducibility");

    const frequency =
        getValue("frequency");

    const testData =
        getValue("testData");

    const attachments =
        getValue("attachments");

    const relatedIssue =
        getValue("relatedIssue");

    const regression =
        getValue("regression");

    const notes =
        getValue("notes");


    let report = "";


    report += `## Report Generated\n`;
    report += `${timestamp}\n\n`;

    report += `## Title\n`;
    report += `${title}\n\n`;


    report += `## Description\n`;
    report += `${description}\n\n`;


    report += `## Environment\n`;
    report += `${environment}\n\n`;


    report += `## Application / Build Version\n`;
    report += `${version}\n\n`;


    report += `## Operating System\n`;
    report += `${os}\n\n`;


    report += `## Browser / Device\n`;
    report += `${browser}\n\n`;


    report += `## User Role\n`;
    report += `${userRole}\n\n`;


    report += `## Preconditions\n`;
    report += `${preconditions}\n\n`;


    report += `## Steps to Reproduce\n`;
    report += `${steps}\n\n`;


    report += `## Expected Result\n`;
    report += `${expected}\n\n`;


    report += `## Actual Result\n`;
    report += `${actual}\n\n`;


    report += `## Severity\n`;
    report += `${severity}\n\n`;


    report += `## Priority\n`;
    report += `${priority}\n\n`;


    report += `## Reproducibility\n`;
    report += `${reproducibility}\n\n`;


    report += `## Frequency\n`;
    report += `${frequency}\n\n`;


    report += `## Test Data\n`;
    report += `${testData}\n\n`;


    report += `## Attachments / Evidence\n`;
    report += `${attachments}\n\n`;


    report += `## Related Issue / Requirement\n`;
    report += `${relatedIssue}\n\n`;


    report += `## Regression Information\n`;
    report += `${regression}\n\n`;


    report += `## Additional Notes\n`;
    report += `${notes}`;


    const output =
        document.getElementById("output");


    output.value =
        report;


    const outputCard =
        document.getElementById(
            "outputCard"
        );


    outputCard.classList.remove(
        "hidden"
    );


    outputCard.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}



async function copyReport() {

    const output =
        document.getElementById(
            "output"
        );


    const button =
        document.getElementById(
            "copyButton"
        );


    if (!output.value) {
        return;
    }


    try {

        await navigator.clipboard.writeText(
            output.value
        );


        button.textContent =
            "Copied!";


        button.classList.add(
            "copied"
        );


        setTimeout(() => {

            button.textContent =
                "Copy to Clipboard";


            button.classList.remove(
                "copied"
            );

        }, 2000);


    } catch (error) {

        output.select();

        document.execCommand(
            "copy"
        );


        button.textContent =
            "Copied!";


        setTimeout(() => {

            button.textContent =
                "Copy to Clipboard";

        }, 2000);

    }

}


function clearForm() {

    const inputs =
        document.querySelectorAll(
            "input, textarea, select"
        );


    inputs.forEach(element => {

        element.value = "";

    });


    document
        .getElementById("outputCard")
        .classList.add("hidden");


    document
        .getElementById("output")
        .value = "";

}



document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await loadAllDropdowns();


        document
            .getElementById(
                "generateButton"
            )
            .addEventListener(
                "click",
                generateReport
            );


        document
            .getElementById(
                "copyButton"
            )
            .addEventListener(
                "click",
                copyReport
            );


        document
            .getElementById(
                "clearButton"
            )
            .addEventListener(
                "click",
                clearForm
            );

    }
);
