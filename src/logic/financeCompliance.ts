export const financeCompliance = {
  stripe: {
    enabled: true,
    modes: ["Deposit", "Full_Payment", "Progress_Billing"],
    currency: "USD"
  },
  coiGenerator: {
    template: "Whale_Standard_v1",
    includeLicense: "Class_A_Worden",
    autoAttachToBids: true
  },
  institutionalNode: {
    target: "Planned_Medical_Facilities",
    logic: "Zero_Disruption_Paving",
    requirements: ["HIPAA_Compliant_Site_Ops", "Night_Ops_Standard"]
  }
};