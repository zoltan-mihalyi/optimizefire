import {UpdateExpression} from 'estree';
import {types} from 'recast';
import {toRule} from '../../../RuleMapper';
import {CompletionRecord} from '../../domain/CompletionRecords';
import {getValue} from '../../rules/Others';
import {RuleExpression, trackOptimized} from '../../rules/RuleExpression';
import {inNewScope, RuleLetStatement} from '../../rules/RuleStatements';

export function UpdateExpression(node: UpdateExpression): RuleExpression<CompletionRecord> {
    const argument = trackOptimized(toRule(node.argument));
    return inNewScope([
        new RuleLetStatement('arg', getValue(argument)),
    ], () => types.builders.updateExpression(node.operator, argument.toExpression(), node.prefix)); // TODO
}
