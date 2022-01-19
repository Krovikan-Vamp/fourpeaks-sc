const patientSchema = new Schema({
    // name: String,
    // dob: Date,
    // dos: Date,
    dof: Date,
    // submittedBy: String,
    // procedure: String,
    physician: String,
    ptPhys: [{
        title: String,
        name: String,
        phone: String,
        fax: String
    }],
    ptForms: {
        a1c: Boolean,
        clearance: Boolean,
        pacemaker: Boolean,
        antiCoag: Boolean
    },
    notes: String,
    received: Boolean
})