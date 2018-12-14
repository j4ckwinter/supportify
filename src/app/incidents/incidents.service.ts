import {Incident} from "./incident.model";
import {Subject} from "rxjs";
import {Client} from "../clients/client.model";
import {Email} from "./email.model";

export class IncidentsService {

  incidentChanged = new Subject<Incident[]>();
  startedEditing = new Subject<number>();

  private incidents: Incident[] = [
    new Incident(
      10001,
      'Cross Site Scripting Vulnerability',
      'Issue with cross site scripting when accessing WebConnect',
      3,
      'Open',
        new Client(1, 'ABN', 'Netherlands'),
      new Email(1, 'SI 10001 - Cross Site Scripting Vulnerability', '14/12/2018', 'Hello.\n' +
        '\n' +
        'Wells Fargo is requested a fix for Cross-site scripting (XSS) vulnerability with the CMS application.\n' +
        '\n' +
        'I have seen some other incidents both CMS and non CMS pertaining to what might be the same vulnerability and there was even a fix for ANZ.\n' +
        '\n' +
        'Would you require further details from Wells Fargo on this matter?\n' +
        '\n' +
        'Kind Regards,\n' +
        'Breddy C.\n')
      ),
    new Incident(
      10002,
      'Fails Not Being Auto Cancelled',
      'Fails processing bypassing max day rollover and not getting cancelled',
      2,
      'Open',
        new Client(2, 'Mizuho', 'Japan'),
      new Email(2, '', '14/12/2018', 'Hi CMS-IDLM DEV,\n' +
        '\n' +
        'RBC on CMS 2.6.4.2 have noticed that sometimes messages are automatically cancelled in the system at some point after becoming fails process candidates. \n' +
        '\n' +
        'In Process Designer, this process appears to involve some kind of cancelling happening – can you help me understand what scenarios this automatic message cancelling happens?:\n' +
        ' \n' +
        'Attached is an example of where this appears to be happening (CMR_BDR_TRANS-v2.xls). \n' +
        '\n' +
        '2 x PROJ messages (amounts 842.16 and -2806.32) are getting PROPosed matched with an ACT message (amount = -1767.75). \n' +
        '\n' +
        '1)\t2 PROJ loaded (762682 and 762684) @ 2018-10-15 07:59:08\n' +
        '\n' +
        '2)\tFails process schedule occurs because the next transactions are fails duplicates (763625 and 763629). Fails duplicates retain the same load_time as the original PROJ messages as per usual. \n' +
        '\n' +
        '3)\tACT message comes through @ 2018-10-15 12:21:49. \n' +
        'PROBLEM 1: I’m not sure how a fails process schedule could have run between loading PROJ messages and the ACT messages because it’s within the same day and the value_date = 15-Oct so that’s confusing (I’ve checked the cms_ref_account_param table – attached – for this account and fails processing happens at time 00:01). \n' +
        '\n' +
        '4)\tI think the PROPosed automatching must be happening at this point\n' +
        '\n' +
        '5)\tThe PROJ messages are then automatically cancelled (PROBLEM 2: what is the scenario in which this happens? I can’t seem to get it to do it in my system, but I’m still working on it – I’ve still got some environment problems to overcome with getting matching up and running on this environment that didn’t previously have it). The automatic cancelling process must be doing a similar thing as with fails in terms of inheriting the load_time of the original messages because the load_time is the same as the original messages. PROBLEM 3: Why does the load_time of fails duplicates – and in this case with the automatic cancelling of messages as well – inherit the load_time of the original messages? Surely it would be better to have the load_time as the time when the action was done? It is the fails duplicate messages that get cancelled. PROBLEM 4: It is strange because normally the messages that are cancelled have trade_type = CXL, but in this case, it is the automatic CAN messages that have this trade_type and the fails duplicates have CAN trade_type (normally it is the other way round with message cancelling).\n' +
        '\n' +
        'I would like to investigate this more and I still have a number of avenues to explore but I’m running out of time as it’s becoming quite urgent for the customer to understand this process now so I need to get some help from you in tandem to speed up the resolution time if that’s possible. \n' +
        '\n' +
        'Let me know what you think/if you need anything. \n' +
        '\n' +
        'Thanks\n' +
        'Oli\n')
    )
  ];

  getIncidents() {
    return this.incidents.slice();
  }

  getIncident(index: number) {
    return this.incidents[index];
  }

  getIncidentByStatus(status: string) {
    return this.incidents[status];
  }

  addIncident(incident: Incident) {
    this.incidents.push(incident); // spread operator, turn array into list
    this.incidentChanged.next(this.incidents.slice()) // emitting now as a subject type
  }

  updateIncident(index: number, newIncident: Incident) {
    this.incidents[index] = newIncident;
    this.incidentChanged.next(this.incidents.slice());
  }

  closeIncident(index: number) {
    this.incidents.splice(index, 1);
    this.incidentChanged.next(this.incidents.slice());
  }

}
